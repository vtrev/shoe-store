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



-- INSERT COLORS
INSERT INTO colors (color) values ('White');
INSERT INTO colors (color) values ('Pink');
INSERT INTO colors (color) values ('Green');
INSERT INTO colors (color) values ('Gray');
INSERT INTO colors (color) values ('Yellow');
INSERT INTO colors (color) values ('Blue');
INSERT INTO colors (color) values ('Cream');
INSERT INTO colors (color) values ('Black');

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




-- INSERT THE SHOES INTO THE CATALOGUE

INSERT INTO shoes (qty,price,size_id,brand_id,image_id,color_id) values (10,999,5,1,1,8);