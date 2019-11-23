DROP TABLE IF EXISTS `xref_order_product`;
CREATE TABLE `xref_order_product` ( 
    ID INT NOT NULL AUTO_INCREMENT,
    order_ID INT NOT NULL,
    product_ID INT NOT NULL,
    product_price FLOAT NOT NULL,
    product_quantity INT NOT NULL,
    IsActive bit(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (ID)
);