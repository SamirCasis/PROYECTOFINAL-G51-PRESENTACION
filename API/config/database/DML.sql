INSERT INTO properties (title, location, meters, bedrooms, bathrooms, description, price, imgurl)
VALUES
('Casa de 2 pisos', 'La Granja, Santiago', 60, 3, 2, 'Cercana a Cesfam, comisaría, Áreas verdes. A 12 minutos del mall plaza Vespucio, clínica, Metro la granja, bencineras.', 2700, 'https://imagizer.imageshack.com/img922/2370/ZXn1nd.jpg'),
('Cabaña Playera', 'Pichilemu, Chile', 80, 4, 2, 'Cabaña totalmente amoblada a pasos de la playa, en un entorno increíble.', 3000, 'https://imagizer.imageshack.com/img923/6835/X0NMaT.jpg'),
('Departamento Centro', 'Providencia, Santiago', 50, 1, 1, 'Amplio departamento, con excelente ubicación cercano a supermercados, estaciones de metro y más servicios.', 3800, 'https://imagizer.imageshack.com/img922/9241/d95sLn.jpg');


INSERT INTO users (name, phone, email, password, rol)
VALUES 
('Samir', '9200000', 'samir.casis@gmail.com', '$2b$10$moUTweIlkEXCRVQ1h2Jc/eMFJaGFxqxIWj1eOgsJrGdLsQd5AH5iu', 'admin'),
('Prueba', '7800000', 'prueba@gmail.com', '$2b$10$2q9IMBNYNKz5msczuu0/0uH5YIIkoqnXg7RSJ8GOWzxr5jGxt45/m', 'usuario');

SELECT * FROM properties;
SELECT * FROM users;
SELECT * FROM transactions;