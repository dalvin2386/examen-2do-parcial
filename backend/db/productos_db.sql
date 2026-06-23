CREATE DATABASE IF NOT EXISTS productos_db;
USE productos_db;

CREATE TABLE IF NOT EXISTS Producto (
    idProducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10,2) NOT NULL,
    estado INT DEFAULT 1,
    categoria VARCHAR(100),
    url_fotografia VARCHAR(500)
);

INSERT INTO Producto (nombre, descripcion, precio, estado, categoria, url_fotografia) VALUES
('Laptop HP', 'Laptop HP Pavilion 15.6 pulgadas', 15000.00, 1, 'Electrónica', ''),
('Teclado Mecánico', 'Teclado mecánico RGB', 1200.00, 1, 'Accesorios', ''),
('Mouse Inalámbrico', 'Mouse ergonómico inalámbrico', 800.00, 0, 'Accesorios', '');
