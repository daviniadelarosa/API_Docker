#DROP DATABASE IF EXISTS TrainingPro;

#CREATE DATABASE TrainingPro;

USE TrainingPro;

CREATE TABLE students(
id INT AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  dni VARCHAR(9) UNIQUE NOT NULL,
  pass VARCHAR(255),
`name` VARCHAR(100) NOT NULL,
lastnames VARCHAR(200) NOT NULL,
address VARCHAR(200) NOT NULL,
phone VARCHAR(15) NOT NULL,
isVisible BOOL NOT NUll,
  isRegistered BOOL NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE courses(
id INT AUTO_INCREMENT,
`code` VARCHAR(50) UNIQUE NOT NULL,
  `name` VARCHAR(255) UNIQUE NOT NULL,
start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  cover VARCHAR(511),
  PRIMARY KEY (id)
);

CREATE TABLE students_courses(
id INT AUTO_INCREMENT,
  fk_id_student INT NOT NULL,
  fk_id_course INT NOT NULL,
  grade1 FLOAT,
  grade2 FLOAT,
grade3 FLOAT,
PRIMARY KEY(id),
  FOREIGN KEY(fk_id_student) REFERENCES students(id),
  FOREIGN KEY(fk_id_course) REFERENCES courses(id)
);

CREATE TABLE professors(
id INT AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  dni VARCHAR(9) UNIQUE NOT NULL,
  pass VARCHAR(255),
`name` VARCHAR(100) NOT NULL,
lastnames VARCHAR(200) NOT NULL,
address VARCHAR(200) NOT NULL,
phone VARCHAR(15) NOT NULL,
isVisible BOOL NOT NUll,
  isRegistered BOOL NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE staff(
id INT AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  dni VARCHAR(9) UNIQUE NOT NULL,
  pass VARCHAR(255),
`name` VARCHAR(100) NOT NULL,
lastnames VARCHAR(200) NOT NULL,
address VARCHAR(200) NOT NULL,
phone VARCHAR(15) NOT NULL,
isVisible BOOL NOT NUll,
    isRegistered BOOL NOT NULL,
PRIMARY KEY(id)
);

#INSERTS TABLA STUDENTS
INSERT INTO students (email, dni, pass, name, lastnames, address, phone, isVisible, isRegistered) 
VALUES 
('juan.perez@example.com', '12345678A', 'password123', 'Juan', 'Pérez García', 'Calle Falsa 123', '600123456', TRUE, TRUE),
('maria.lopez@example.com', '87654321B', 'password456', 'María', 'López Martínez', 'Avenida Siempre Viva 456', '600654321', TRUE, TRUE),
('carlos.gomez@example.com', '23456789C', 'password789', 'Carlos', 'Gómez Fernández', 'Plaza Mayor 789', '600987654', TRUE, FALSE),
('ana.martinez@example.com', '34567890D', 'password012', 'Ana', 'Martínez Sánchez', 'Calle Luna 101', '600112233', FALSE, TRUE);

#INSERTS TABLA COURSES
INSERT INTO courses (code, name, start_date, end_date, cover) 
VALUES 
('MAT101', 'Matemáticas Básicas', '2023-09-01', '2023-12-15', 'https://example.com/covers/mat101.jpg'),
('FIS201', 'Física Avanzada', '2023-09-01', '2023-12-15', 'https://example.com/covers/fis201.jpg'),
('QUI301', 'Química Orgánica', '2023-09-01', '2023-12-15', 'https://example.com/covers/qui301.jpg'),
('BIO401', 'Biología Molecular', '2023-09-01', '2023-12-15', 'https://example.com/covers/bio401.jpg');

#INSERTS TABLA STUDENTS_COURSES
INSERT INTO students_courses (fk_id_student, fk_id_course, grade1, grade2, grade3) 
VALUES 
(1, 1, 8.5, 7.0, 9.0),
(2, 2, 9.0, 8.5, 9.5),
(3, 3, 7.5, 8.0, 7.0),
(4, 4, 6.5, 7.5, 8.0);

#INSERTS TABLA PROFESSORS
INSERT INTO professors (email, dni, pass, name, lastnames, address, phone, isVisible, isRegistered) 
VALUES 
('prof.jose.garcia@example.com', '11223344E', 'prof123', 'José', 'García López', 'Calle Profesores 1', '600223344', TRUE, TRUE),
('prof.maria.fernandez@example.com', '22334455F', 'prof456', 'María', 'Fernández Martínez', 'Avenida Educadores 2', '600334455', TRUE, TRUE),
('prof.carlos.martin@example.com', '33445566G', 'prof789', 'Carlos', 'Martín Sánchez', 'Plaza Docentes 3', '600445566', TRUE, FALSE),
('prof.ana.lopez@example.com', '44556677H', 'prof012', 'Ana', 'López Gómez', 'Calle Maestros 4', '600556677', FALSE, TRUE);

#TABLA STAFF
INSERT INTO staff (email, dni, pass, name, lastnames, address, phone, isVisible, isRegistered) 
VALUES 
('staff.juan.gomez@example.com', '55667788I', 'staff123', 'Juan', 'Gómez Pérez', 'Calle Administración 5', '600667788', TRUE, TRUE),
('staff.maria.martinez@example.com', '66778899J', 'staff456', 'María', 'Martínez López', 'Avenida Servicios 6', '600778899', TRUE, TRUE),
('staff.carlos.fernandez@example.com', '77889900K', 'staff789', 'Carlos', 'Fernández García', 'Plaza Soporte 7', '600889900', TRUE, FALSE),
('staff.ana.sanchez@example.com', '88990011L', 'staff012', 'Ana', 'Sánchez Martínez', 'Calle Mantenimiento 8', '600990011', FALSE, TRUE);