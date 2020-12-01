create database if not exists perfect_supplier character set = 'utf8mb4' collate = 'utf8mb4_spanish_ci';

use perfect_supplier;

-- Main tables --
create table if not exists user (
    id integer unsigned auto_increment,
    email varchar(50) not null ,
    password varchar(30) not null ,
    bio varchar(150),
    photo longblob not null ,
    constraint user_id_user_pk primary key (id)
);

create table if not exists product (
    id integer unsigned auto_increment,
    id_user integer unsigned,
    location varchar(50) not null ,
    price float not null ,
    category varchar(50) not null ,
    name varchar(50) not null,
    constraint product_id_product_pk primary key (id),
    constraint product_id_user_fk1 foreign key (id_user) references user(id) on delete cascade on update cascade
);

-- Relation tables --

create table if not exists deal (
    id_user integer unsigned,
    id_product integer unsigned,
    review varchar(150),
    startDate date not null ,
    endDate date not null ,
    accepted tinyint default null,
    constraint deal_id_user_pk primary key (id_user),
    constraint deal_id_user_fk1 foreign key (id_user) references user(id),
    constraint deal_id_product_fk2 foreign key (id_product) references product(id)
);

create table if not exists ratingTable (
    id_product integer unsigned,
    rating integer unsigned default 0,
    numberRatings integer unsigned default 0,
    constraint ratingTable_id_supply_pk primary key (id_product),
    constraint ratingTable_id_supply_fk1 foreign key (id_product) references product(id)
);

