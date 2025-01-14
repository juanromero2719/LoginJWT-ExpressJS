CREATE TABLE users (
    id SERIAL PRIMARY KEY,                -- ID único para cada usuario
	firstname VARCHAR(200)     			-- Nombre Usuario
	lastname = VARCHAR(200)				-- Apellido del usuario 
     -- Nombre de usuario único
    password TEXT NOT NULL,               -- Contraseña encriptada
    email VARCHAR(100) UNIQUE         -- Email único
);
