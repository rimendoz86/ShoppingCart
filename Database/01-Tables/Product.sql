DROP TABLE IF EXISTS Product;
CREATE TABLE Product ( 
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(100) NULL,
    ImageRef VARCHAR(50) NOT NULL,
    Price FLOAT NOT NULL,
    CreatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    IsActive bit(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (ID)
    );

INSERT INTO Product 
    (Name, Description, ImageRef, Price)
VALUES
    ("Apple","An Apple a day keeps the doctor away.","apple.jpg",1.89),
    ("Banana","Monkeys love bananas, they are good for humans too", "banana.jpg",1.78),
    ("Orange","Orange is the only food that shares its name with its color","orange.jpg",2.09)