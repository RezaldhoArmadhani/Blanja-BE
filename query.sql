-- create database onlineshop;
-- \c onlineshop

create type kelamin as enum ('male', 'female');

create table customer (
    id_customer int primary key,
    name varchar (255),
    phone int,
    password varchar (255),
    email varchar (255),
    gender kelamin,
    birth_date date
);

create table seller (
    id_seller int primary key,
    name varchar (255),
    phone int,
    password varchar (255),
    email varchar (255),
    gender kelamin,
    birth_date date
);

create table product (
    id_product int primary key,
    name varchar (255),
    price int,
    description varchar (255),
    stock int,
    rating int,
    color varchar (255),
    size varchar (255),
    id_category int,
    CONSTRAINT fk_category FOREIGN KEY (id_category) REFERENCES category(id_category),
    id_seller int,
    CONSTRAINT fk_seller FOREIGN KEY (id_seller) REFERENCES seller(id_seller)
);

create table category (
    id_category int primary key,
    name varchar(255)
);

--CRUD Tabel customer
-- -- create
insert into customer (id_customer, name, phone, password, email, gender, birth_date) values
(101, 'Andy', 08123451, 'nopas', 'andy@gmail.com', 'laki-laki', '01-03-2000'),
(102, 'Buggy', 08123452, 'nopass', 'buggy@gmail.com', 'laki-laki', '02-03-2000'),
(103, 'Chelsea', 08123453, 'nopasss', 'chelsea@gmail.com', 'perempuan', '03-03-2000');
-- -- read
-- select * from mentor;
-- select nama_mentor, kelamin from mentor;
-- -- update
-- update mentor set umur_mentor = 29 where id_mentor = 444;
-- update mentor set umur_mentor = 29, nama_mentor = 'sakura haruno' where id_mentor = 333;
-- -- delete
-- delete from mentor where id_mentor = 333;

insert into product (id_product, name, price, description, stock, rating, color, size, id_category, id_seller) values
(1001, 'Kaos Oblong', 50000, 'Kaos adem', 75, 5, 'red', 'L', (select id_category from category where id_category =1), (select id_seller from seller where id_seller =10))
insert into product (id_product, name, price, description, stock, rating, color, size, id_category, id_seller) values
(1002, 'Kaos Polo', 75000, 'Kaos semi formal', 75, 5, 'blue', 'L', (select id_category from category where id_category =1), (select id_seller from seller where id_seller =10))

insert into category (id_category, name) values
(1, 'T-Shirt'),

insert into seller (id_seller, name, phone, password, email, gender, birth_date) values
(10, 'Anderson', 6131545, 'nopas', 'anderson@gmail.com', 'laki-laki', '01-03-2000'),