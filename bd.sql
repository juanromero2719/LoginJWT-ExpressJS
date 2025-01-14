-- Crear tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,         -- ID único para cada rol
    name VARCHAR(50) NOT NULL UNIQUE -- Nombre único del rol (e.g., "Admin", "User", etc.)
);

-- Crear tabla de usuarios con referencia al rol
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                -- ID único para cada usuario
    firstname VARCHAR(200),               -- Nombre del usuario
    lastname VARCHAR(200),                -- Apellido del usuario
    password TEXT NOT NULL,               -- Contraseña encriptada
    email VARCHAR(100) UNIQUE,            -- Email opcional y único
    role_id INT REFERENCES roles(id)      -- Clave foránea que referencia a roles
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,        -- Identificador único autoincremental
    nombre VARCHAR(100) NOT NULL, -- Nombre del producto
    descripcion TEXT,             -- Descripción del producto
    precio DECIMAL(10, 2) NOT NULL -- Precio del producto con 2 decimales
);
