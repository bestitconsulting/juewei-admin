-- Seed data for development
-- This file contains sample data for testing and development

-- Insert sample categories
INSERT INTO categories (id, name_en, name_zh, slug, description_en, description_zh, image_url, sort_order, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Spicy Snacks', '辣味零食', 'spicy-snacks', 'Hot and spicy snacks for those who love heat', '为喜欢辣味的人准备的热辣零食', '/images/categories/spicy-snacks.jpg', 1, true),
('550e8400-e29b-41d4-a716-446655440002', 'Dried Meat', '肉干', 'dried-meat', 'Premium dried meat products', '优质肉干产品', '/images/categories/dried-meat.jpg', 2, true),
('550e8400-e29b-41d4-a716-446655440003', 'Nuts & Seeds', '坚果种子', 'nuts-seeds', 'Healthy nuts and seeds', '健康坚果和种子', '/images/categories/nuts-seeds.jpg', 3, true),
('550e8400-e29b-41d4-a716-446655440004', 'Traditional Snacks', '传统零食', 'traditional-snacks', 'Classic Chinese traditional snacks', '经典中国传统零食', '/images/categories/traditional-snacks.jpg', 4, true);

-- Insert sample products
INSERT INTO products (id, category_id, name_en, name_zh, slug, description_en, description_zh, price, currency, images, specifications, nutritional_info, tags, is_active, sort_order) VALUES
('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'Spicy Duck Neck', '麻辣鸭脖', 'spicy-duck-neck', 'Spicy and flavorful duck neck, perfect for snacking', '麻辣可口的鸭脖，完美的零食选择', 12.99, 'USD', '["/images/products/spicy-duck-neck-1.jpg", "/images/products/spicy-duck-neck-2.jpg"]', '{"weight": "200g", "ingredients": ["duck neck", "chili", "spices"], "allergens": ["soy"], "shelfLife": "30 days", "storage": "refrigerate"}', '{"calories": 280, "protein": 25, "fat": 18, "sodium": 1200, "servingSize": "100g"}', '["spicy", "duck", "snack", "traditional"]', true, 1),

('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001', 'Hot Chicken Feet', '辣鸡爪', 'hot-chicken-feet', 'Spicy chicken feet with authentic Chinese flavor', '正宗中国风味的辣鸡爪', 8.99, 'USD', '["/images/products/hot-chicken-feet-1.jpg"]', '{"weight": "150g", "ingredients": ["chicken feet", "chili", "garlic", "ginger"], "allergens": ["soy"], "shelfLife": "25 days", "storage": "refrigerate"}', '{"calories": 220, "protein": 20, "fat": 12, "sodium": 1000, "servingSize": "100g"}', '["spicy", "chicken", "snack", "traditional"]', true, 2),

('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440002', 'Premium Beef Jerky', '优质牛肉干', 'premium-beef-jerky', 'High-quality dried beef with rich flavor', '高品质牛肉干，味道浓郁', 15.99, 'USD', '["/images/products/beef-jerky-1.jpg", "/images/products/beef-jerky-2.jpg"]', '{"weight": "100g", "ingredients": ["beef", "salt", "sugar", "spices"], "allergens": [], "shelfLife": "90 days", "storage": "room temperature"}', '{"calories": 320, "protein": 35, "fat": 15, "sodium": 800, "servingSize": "50g"}', '["beef", "jerky", "protein", "healthy"]', true, 3),

('550e8400-e29b-41d4-a716-446655440104', '550e8400-e29b-41d4-a716-446655440003', 'Roasted Almonds', '烤杏仁', 'roasted-almonds', 'Premium roasted almonds, perfect for healthy snacking', '优质烤杏仁，健康零食的完美选择', 9.99, 'USD', '["/images/products/almonds-1.jpg"]', '{"weight": "200g", "ingredients": ["almonds", "salt"], "allergens": ["nuts"], "shelfLife": "180 days", "storage": "room temperature"}', '{"calories": 580, "protein": 21, "fat": 50, "fiber": 12, "servingSize": "30g"}', '["nuts", "healthy", "protein", "snack"]', true, 4),

('550e8400-e29b-41d4-a716-446655440105', '550e8400-e29b-41d4-a716-446655440004', 'Traditional Rice Crackers', '传统米饼', 'traditional-rice-crackers', 'Classic Chinese rice crackers with traditional flavor', '传统中国米饼，经典口味', 6.99, 'USD', '["/images/products/rice-crackers-1.jpg"]', '{"weight": "150g", "ingredients": ["rice", "sesame", "salt"], "allergens": ["sesame"], "shelfLife": "120 days", "storage": "room temperature"}', '{"calories": 400, "protein": 8, "fat": 12, "sodium": 600, "servingSize": "30g"}', '["rice", "traditional", "crackers", "snack"]', true, 5);

-- Insert sample admin user (for testing)
INSERT INTO users (id, email, phone, password_hash, first_name, last_name, loyalty_points, preferences) VALUES
('550e8400-e29b-41d4-a716-446655440201', 'admin@juewei.com', '+1234567890', '$2a$10$example.hash.for.admin.password', 'Admin', 'User', 0, '{"language": "en", "currency": "USD", "notifications": {"email": true, "sms": false, "push": true}, "theme": "light"}');

-- Insert sample regular user (for testing)
INSERT INTO users (id, email, phone, password_hash, first_name, last_name, loyalty_points, preferences) VALUES
('550e8400-e29b-41d4-a716-446655440202', 'customer@example.com', '+1234567891', '$2a$10$example.hash.for.customer.password', 'John', 'Doe', 100, '{"language": "en", "currency": "USD", "notifications": {"email": true, "sms": true, "push": true}, "theme": "system"}');

-- Insert sample addresses for the customer
INSERT INTO addresses (id, user_id, type, street_address, city, province, postal_code, country, is_default) VALUES
('550e8400-e29b-41d4-a716-446655440301', '550e8400-e29b-41d4-a716-446655440202', 'shipping', '123 Main Street', 'New York', 'NY', '10001', 'US', true),
('550e8400-e29b-41d4-a716-446655440302', '550e8400-e29b-41d4-a716-446655440202', 'billing', '123 Main Street', 'New York', 'NY', '10001', 'US', true);

-- Insert sample cart items for the customer
INSERT INTO cart_items (id, user_id, product_id, quantity, unit_price) VALUES
('550e8400-e29b-41d4-a716-446655440401', '550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440101', 2, 12.99),
('550e8400-e29b-41d4-a716-446655440402', '550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440103', 1, 15.99);

-- Insert sample order
INSERT INTO orders (id, user_id, order_number, status, subtotal, tax_amount, shipping_cost, total_amount, payment_method, payment_status, shipping_address, billing_address) VALUES
('550e8400-e29b-41d4-a716-446655440501', '550e8400-e29b-41d4-a716-446655440202', 'JW-2024-001', 'completed', 25.98, 2.60, 5.99, 34.57, 'stripe', 'succeeded', 
'{"street_address": "123 Main Street", "city": "New York", "province": "NY", "postal_code": "10001", "country": "US"}',
'{"street_address": "123 Main Street", "city": "New York", "province": "NY", "postal_code": "10001", "country": "US"}');

-- Insert sample order items
INSERT INTO order_items (id, order_id, product_id, product_name, product_image, quantity, unit_price, total_price) VALUES
('550e8400-e29b-41d4-a716-446655440601', '550e8400-e29b-41d4-a716-446655440501', '550e8400-e29b-41d4-a716-446655440101', 'Spicy Duck Neck', '/images/products/spicy-duck-neck-1.jpg', 2, 12.99, 25.98);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_active ON products(category_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_price_range ON products(price) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_product ON cart_items(user_id, product_id);

-- Create full-text search indexes
CREATE INDEX IF NOT EXISTS idx_products_search_en ON products USING gin(to_tsvector('english', name_en || ' ' || COALESCE(description_en, '')));
CREATE INDEX IF NOT EXISTS idx_products_search_zh ON products USING gin(to_tsvector('simple', name_zh || ' ' || COALESCE(description_zh, '')));

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    new_number TEXT;
    counter INTEGER;
BEGIN
    -- Get the current year
    new_number := 'JW-' || EXTRACT(YEAR FROM NOW()) || '-';
    
    -- Get the next counter for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM LENGTH(new_number) + 1) AS INTEGER)), 0) + 1
    INTO counter
    FROM orders
    WHERE order_number LIKE new_number || '%';
    
    -- Format with leading zeros
    new_number := new_number || LPAD(counter::TEXT, 3, '0');
    
    RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
        NEW.order_number := generate_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION set_order_number();
