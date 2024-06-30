CREATE DATABASE IF NOT EXISTS databaseclase;
USE databaseclase;

CREATE TABLE actors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    rating DECIMAL(10, 2)
);

CREATE TABLE genres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    ranking INT,
    active TINYINT(1)
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    rating DECIMAL(10, 2),
    awards INT,
    length INT,
    genre_id INT,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    remember_token VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

CREATE TABLE actor_movie (
    actor_id INT,
    movie_id INT,
    PRIMARY KEY (actor_id, movie_id),
    FOREIGN KEY (actor_id) REFERENCES actors(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

INSERT INTO actors (first_name, last_name, rating)
VALUES
    ('Tom', 'Hanks', 8.5),
    ('Leonardo', 'DiCaprio', 9.0),
    ('Scarlett', 'Johansson', 8.7),
    ('Brad', 'Pitt', 8.3),
    ('Jennifer', 'Lawrence', 8.1);

INSERT INTO genres (name, ranking, active)
VALUES
    ('Action', 1, 1),
    ('Comedy', 2, 1),
    ('Drama', 3, 1),
    ('Sci-Fi', 4, 1),
    ('Romance', 5, 1);

INSERT INTO movies (title, rating, awards, length, genre_id)
VALUES
    ('The Shawshank Redemption', 9.3, 7, 142, 3),
    ('The Godfather', 9.2, 5, 175, 3),
    ('The Dark Knight', 9.0, 8, 152, 1),
    ('Inception', 8.8, 4, 148, 4),
    ('Pulp Fiction', 8.9, 6, 154, 2);

INSERT INTO users (name, email, password, remember_token, created_at, updated_at)
VALUES
    ('Alice Smith', 'alice@example.com', 'password123', 'token123', NOW(), NOW()),
    ('Bob Johnson', 'bob@example.com', 'securepass', 'token456', NOW(), NOW()),
    ('Charlie Brown', 'charlie@example.com', 'password321', 'token789', NOW(), NOW()),
    ('Diana Lee', 'diana@example.com', 'p@ssw0rd', 'token987', NOW(), NOW()),
    ('Eve Williams', 'eve@example.com', 'letmein', 'token654', NOW(), NOW());

-- Asociación de actores y películas
INSERT INTO actor_movie (actor_id, movie_id)
VALUES
    (1, 1), -- Tom Hanks en The Shawshank Redemption
    (2, 1), -- Leonardo DiCaprio en The Shawshank Redemption
    (2, 3), -- Leonardo DiCaprio en The Dark Knight
    (3, 4), -- Scarlett Johansson en Inception
    (4, 5), -- Brad Pitt en Pulp Fiction
    (5, 5); -- Jennifer Lawrence en Pulp Fiction
