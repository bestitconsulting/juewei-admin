import { supabase } from './supabase'
import { logger } from './logger'
import { AppError, DatabaseError } from './errors'

// Database utility functions
export class DatabaseService {
  // Generic query method
  static async query<T>(
    table: string,
    operation: 'select' | 'insert' | 'update' | 'delete',
    data?: any,
    filters?: Record<string, any>,
    options?: {
      select?: string
      orderBy?: { column: string; ascending?: boolean }
      limit?: number
      offset?: number
    }
  ): Promise<T[]> {
    try {
      logger.debug(`Database query: ${operation} on ${table}`, { table, operation, filters, options })

      let query = supabase.from(table)

      switch (operation) {
        case 'select':
          if (options?.select) {
            query = query.select(options.select)
          } else {
            query = query.select('*')
          }
          break
        case 'insert':
          query = query.insert(data)
          break
        case 'update':
          query = query.update(data)
          break
        case 'delete':
          query = query.delete()
          break
      }

      // Apply filters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value)
          } else {
            query = query.eq(key, value)
          }
        })
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true })
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit)
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data: result, error } = await query

      if (error) {
        logger.error('Database query failed', error, { table, operation, filters })
        throw new DatabaseError(`Database operation failed: ${error.message}`)
      }

      logger.debug(`Database query successful`, { table, operation, resultCount: result?.length || 0 })
      return result || []
    } catch (error) {
      logger.error('Database service error', error as Error, { table, operation, filters })
      throw error instanceof AppError ? error : new DatabaseError('Database operation failed')
    }
  }

  // Get single record
  static async getById<T>(table: string, id: string, select?: string): Promise<T | null> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(select || '*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // Record not found
        }
        throw new DatabaseError(`Failed to get ${table} by id: ${error.message}`)
      }

      return data
    } catch (error) {
      logger.error(`Failed to get ${table} by id`, error as Error, { table, id })
      throw error instanceof AppError ? error : new DatabaseError(`Failed to get ${table} by id`)
    }
  }

  // Create record
  static async create<T>(table: string, data: any): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single()

      if (error) {
        throw new DatabaseError(`Failed to create ${table}: ${error.message}`)
      }

      logger.info(`Created ${table}`, { table, id: result.id })
      return result
    } catch (error) {
      logger.error(`Failed to create ${table}`, error as Error, { table, data })
      throw error instanceof AppError ? error : new DatabaseError(`Failed to create ${table}`)
    }
  }

  // Update record
  static async update<T>(table: string, id: string, data: any): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw new DatabaseError(`Failed to update ${table}: ${error.message}`)
      }

      logger.info(`Updated ${table}`, { table, id })
      return result
    } catch (error) {
      logger.error(`Failed to update ${table}`, error as Error, { table, id, data })
      throw error instanceof AppError ? error : new DatabaseError(`Failed to update ${table}`)
    }
  }

  // Delete record
  static async delete(table: string, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) {
        throw new DatabaseError(`Failed to delete ${table}: ${error.message}`)
      }

      logger.info(`Deleted ${table}`, { table, id })
    } catch (error) {
      logger.error(`Failed to delete ${table}`, error as Error, { table, id })
      throw error instanceof AppError ? error : new DatabaseError(`Failed to delete ${table}`)
    }
  }

  // Batch operations
  static async batchCreate<T>(table: string, data: any[]): Promise<T[]> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()

      if (error) {
        throw new DatabaseError(`Failed to batch create ${table}: ${error.message}`)
      }

      logger.info(`Batch created ${table}`, { table, count: result.length })
      return result
    } catch (error) {
      logger.error(`Failed to batch create ${table}`, error as Error, { table, count: data.length })
      throw error instanceof AppError ? error : new DatabaseError(`Failed to batch create ${table}`)
    }
  }

  // Search with full-text search
  static async search<T>(
    table: string,
    searchTerm: string,
    searchColumns: string[],
    filters?: Record<string, any>,
    options?: {
      limit?: number
      offset?: number
    }
  ): Promise<T[]> {
    try {
      let query = supabase.from(table).select('*')

      // Apply full-text search
      if (searchTerm && searchColumns.length > 0) {
        const searchQuery = searchColumns
          .map(column => `${column}.fts.${searchTerm}`)
          .join(' | ')
        query = query.textSearch(searchQuery)
      }

      // Apply filters
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value)
          } else {
            query = query.eq(key, value)
          }
        })
      }

      // Apply pagination
      if (options?.limit) {
        query = query.limit(options.limit)
      }
      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) {
        throw new DatabaseError(`Search failed: ${error.message}`)
      }

      logger.debug(`Search completed`, { table, searchTerm, resultCount: data?.length || 0 })
      return data || []
    } catch (error) {
      logger.error('Search failed', error as Error, { table, searchTerm, searchColumns })
      throw error instanceof AppError ? error : new DatabaseError('Search failed')
    }
  }

  // Count records
  static async count(table: string, filters?: Record<string, any>): Promise<number> {
    try {
      let query = supabase.from(table).select('*', { count: 'exact', head: true })

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value)
          } else {
            query = query.eq(key, value)
          }
        })
      }

      const { count, error } = await query

      if (error) {
        throw new DatabaseError(`Count failed: ${error.message}`)
      }

      return count || 0
    } catch (error) {
      logger.error('Count failed', error as Error, { table, filters })
      throw error instanceof AppError ? error : new DatabaseError('Count failed')
    }
  }
}

// Export convenience functions
export const db = DatabaseService
