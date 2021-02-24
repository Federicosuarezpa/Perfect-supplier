require("dotenv").config();
const { lorem } = require("faker");
const faker = require("faker");
const { random } = require("lodash");
const getDB = require("./dbConnection");

let connection;

async function main() {
  try {
    connection = await getDB();
    await connection.query("drop table if exists ratingTable");
    await connection.query("drop table if exists deal");
    await connection.query("drop table if exists product");
    await connection.query("drop table if exists user");

    await connection.query(`
            create table if not exists user (
                id integer unsigned auto_increment,
                name varchar(50) not null,
                email varchar(50) not null unique ,
                password varchar(150) not null ,
                bio varchar(150),
                active boolean default false,
                deleted boolean default false,
                registrationCode varchar(300),
                photo longblob ,
                date datetime not null ,
                lastAuthUpdate datetime,
                recoverCode varchar(100),
                numberTrys integer unsigned default 3,
                timeFirstFail datetime,
                constraint user_id_user_pk primary key (id)
            )
        `);
    await connection.query(
      `
            create table if not exists product (
                id integer unsigned auto_increment,
                id_user integer unsigned,
                location varchar(50) not null ,
                price decimal(7,2) not null ,
                description varchar(150) not null ,
                category varchar(50) not null ,
                name varchar(50) not null,
                photo longblob not null,
                constraint product_id_product_pk primary key (id),
                constraint product_id_user_fk1 foreign key (id_user) references user(id) on delete cascade on update cascade
            )
            `
    );
    await connection.query(
      `
            create table if not exists deal (
                id integer unsigned auto_increment,
                id_user integer unsigned,
                id_product integer unsigned,
                price decimal(7,2) not null,
                review varchar(150),
                completed tinyint default 0,
                accepted tinyint default null,
                constraint deal_id_deal_pk primary key (id),
                constraint deal_id_user_fk1 foreign key (id_user) references user(id) on delete cascade on update cascade ,
                constraint deal_id_product_fk2 foreign key (id_product) references product(id) on delete cascade on update cascade
            )
            `
    );
    await connection.query(
      `
            create table if not exists ratingTable (
                id integer unsigned auto_increment,
                id_deal integer unsigned,
                id_product integer unsigned,
                rating integer unsigned default 0,
                rated boolean default false,
                constraint ratingTable_id_ratingTable_pk primary key (id) ,
                constraint ratingTable_id_deal_fk2 foreign key  (id_deal) references  deal(id) on delete cascade  on update cascade ,
                constraint ratingTable_id_product_fk1 foreign key (id_product) references product(id) on delete cascade on update cascade
            )
            `
    );
    await connection.query(
      `
            insert into user (date, email, name, password, active)
            values (?, ?, ?, SHA2(?,512), ?)
            `,
      [new Date(), "fede_mixcai10@hotmail.com", "Federico", "1234A?x.", true]
    );
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
