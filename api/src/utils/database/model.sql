CREATE DATABASE IF NOT EXISTS codeally;
USE codeally;

CREATE TABLE IF NOT EXISTS user_account (
    uuid CHAR(36) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first TINYINT(1) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS user_profile (
    uuid CHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    about VARCHAR(255),
    country VARCHAR(50),
    language VARCHAR(50)
);



-- Triggers
DELIMITER //
CREATE TRIGGER IF NOT EXISTS insert_uuid
    AFTER INSERT ON user_account
    FOR EACH ROW 
BEGIN
    INSERT INTO user_profile (uuid)
    VALUES (NEW.uuid);
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER IF NOT EXISTS delete_uuid
    AFTER DELETE ON user_account
    FOR EACH ROW 
BEGIN
    DELETE FROM user_profile WHERE uuid = OLD.uuid;
END;
//
DELIMITER ;
