-- CREATE TABLES
CREATE TABLE brands
(
    id serial  NOT NULL,
    brand text NOT NULL,
    CONSTRAINT brands_pkey PRIMARY KEY (id),
    CONSTRAINT brands_brand_key UNIQUE (brand)
);

CREATE TABLE colors
(
    id serial  NOT NULL,
    color text NOT NULL,
    CONSTRAINT colors_pkey PRIMARY KEY (id),
    CONSTRAINT colors_color_key UNIQUE (color)
);

CREATE TABLE images
(
    id serial  NOT NULL,
    img_link text ,
    CONSTRAINT images_pkey PRIMARY KEY (id),
    CONSTRAINT images_img_link_key UNIQUE (img_link)
);

CREATE TABLE sizes
(
    id serial  NOT NULL ,
    size integer NOT NULL,
    CONSTRAINT sizes_pkey PRIMARY KEY (id),
    CONSTRAINT size UNIQUE (size)
);

CREATE TABLE shoes
(
    id serial  NOT NULL,
    qty integer,
    price numeric NOT NULL,
    size_id integer NOT NULL,
    brand_id integer NOT NULL,
    image_id integer NOT NULL,
    color_id integer NOT NULL,
    CONSTRAINT shoes_pkey PRIMARY KEY (id),
    CONSTRAINT shoe_brand_fkey FOREIGN KEY (brand_id)
        REFERENCES brands (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT shoe_color_fkey FOREIGN KEY (color_id)
        REFERENCES colors (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT shoe_image_fkey FOREIGN KEY (image_id)
        REFERENCES images (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT shoe_size_fkey FOREIGN KEY (size_id)
        REFERENCES sizes (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
-- CART TABLE THAT WILL KEEP TRACK OF THE SHOES IN THE CART
CREATE TABLE cart(
    shoe_id integer NOT NULL
);


-- INSERT COLORS
INSERT INTO colors (color) values ('White');
INSERT INTO colors (color) values ('Pink');
INSERT INTO colors (color) values ('Green');
INSERT INTO colors (color) values ('Gray');
INSERT INTO colors (color) values ('Yellow');
INSERT INTO colors (color) values ('Blue');
INSERT INTO colors (color) values ('Cream');
INSERT INTO colors (color) values ('Black');
INSERT INTO colors (color) values ('Brown');
INSERT INTO colors (color) values ('Purple');
INSERT INTO colors (color) values ('Orange');

-- INSERT SIZES

INSERT INTO sizes (size) values (4);
INSERT INTO sizes (size) values (5);
INSERT INTO sizes (size) values (6);
INSERT INTO sizes (size) values (7);
INSERT INTO sizes (size) values (8);
INSERT INTO sizes (size) values (9);
INSERT INTO sizes (size) values (10);

-- INSERT BRANDS

INSERT INTO brands (brand) values ('Adidas');
INSERT INTO brands (brand) values ('Fila');
INSERT INTO brands (brand) values ('Jordan');
INSERT INTO brands (brand) values ('Pnp');
INSERT INTO brands (brand) values ('Mrp');
INSERT INTO brands (brand) values ('Converse');
INSERT INTO brands (brand) values ('Soviet');
INSERT INTO brands (brand) values ('Timberland');
INSERT INTO brands (brand) values ('Puma');
INSERT INTO brands (brand) values ('Nike');

--INSERT LINKS TO IMAGES OF THE SHOES
INSERT INTO images (id,img_link) values (0,'img/no-img.png')
INSERT INTO images (img_link) values ('img/ad-black.jpg');
INSERT INTO images (img_link) values ('img/ad-white.jpg');
INSERT INTO images (img_link) values ('img/con-black.jpg');
INSERT INTO images (img_link) values ('img/fila-green.jpg');
INSERT INTO images (img_link) values ('img/jordan-cream.jpg');
INSERT INTO images (img_link) values ('img/nike-black.png');
INSERT INTO images (img_link) values ('img/nike-blue.jpg');
INSERT INTO images (img_link) values ('img/nike-orange.jpg');
INSERT INTO images (img_link) values ('img/puma-brwn.jpg');
INSERT INTO images (img_link) values ('img/sov-purple.png');
INSERT INTO images (img_link) values ('img/timbs-brwn.png');




--INSERT A DEFAULT CATALOGUE

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(16,1500,7,1,2,1);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(9,799,2,6,3,8);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(50,299,7,2,4,3);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(10,2999,6,3,5,7);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(7,899,5,10,6,8);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(15,560,4,10,7,6);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(10,899,4,10,8,11);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(50,699,5,9,9,7);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(20,500,5,7,10,10);

INSERT into shoes(qty,price,size_id,brand_id,image_id,color_id) values(15,2999,5,8,11,9);


