require("dotenv").config();
const { lorem } = require("faker");
const faker = require("faker");
const { random } = require("lodash");
const getDB = require("./dbConnection");
const { formatDateToDB } = require("./helpers");

let connection;

async function main() {
    try {
        connection = await getDB();
        await defineDB();

        await connection.query(
            `
            insert into user (date, email, name, password, active)
            values (?, ?, ?, SHA2(?,512), ?)
            `,
            [new Date(), "fede_mixcai10@hotmail.com", "Federico", "1234A?x.", true]
        );

        await connection.query(
            `
            insert into user (date, email, name, password, active)
            values (?, ?, ?, SHA2(?,512), ?)
            `,
            [new Date(), "pokz1z@outlook.es", "Hernán", "1234x?a.", true]
        );
        
        await connection.query(
            `
            insert into product(location,id_user,category,name,price,description,photo)
            values(?,?,?,?,?,?,?)
            `,
            ["Tarragona",1,"Limpieza","Limpieza en casas",20,"hola","asopd"]
        );

        await connection.query(
            `
            insert into deal (id_user, id_product, startDate, endDate,accepted, price)
            values(?,?,?,?,?,?)
            `,
            [2,1,new Date(),"2021-05-05",true,20]
        );


        const userProvider = 100;

        for (let i = 0; i < userProvider ; i++)
        {
            const now = new Date();
            const email = faker.internet.email();
            const pass = faker.internet.password();
            const name = faker.name.findName();

            await connection.query(
                `
                insert into user (date, email, name, password, active)
                values(?,?,?,SHA2(?, 512),?)
                `,
                [now, email,name, pass, true]
            );
        }

        let products = 100;

        for (let i = 0; i < products; i++)
        {
            let location = ['Tarragona', 'Sevilla', 'Barcelona', 'Madrid', 'Reus'];
            let category = ['Jardineria', 'Cloud Service', 'Limpieza', 'Proveedor bebidas'];
            let name = faker.company.companyName();
            await connection.query(
                `
                insert into product (location, id_user, category, name, price, description, photo)
                values (?,?,?,?,?,?,?)
                `,
                [location[random(0,location.length-1)],random(1,50), category[random(0,category.length-1)], name, random(0,999), faker.company.companyName(),"ioasjdoiasjd"]
            );
        }
        await connection.query(
            `
            insert into deal (id_user, id_product, startDate, endDate, accepted, price)
            values(?,?,?,?,?,?)
            `,
            [1,4,new Date(), "2021-04-04",true,20]
        );

        let books = 60;

        for (let i = 0; i < books; i++)
        {
            const id_user = random(51,99);
            const id_product = random(1,100);
            const startDate = new Date();
            const endDate = new Date();
            await connection.query(
                `
                insert into deal (id_user, id_product, startDate, endDate, accepted, price)
                values(?,?,?,?,?,?)
                `,
                [id_user,id_product,startDate,"2021-12-28",true, random(0,999)]
            );
        }
       /*
        const [productes] = await connection.query(
            `
            select id
            from product
            where id_user = ?
            `,
            [2]
        );
        let arr = productes.map(function(el) {return el.id});
        console.log(arr);
        let [productosPendientes] = await connection.query(
            `
            select * from deal
            where id_product in (?) and endDate > ?
            `,
            [arr, new Date()]
        );

        console.log(productosPendientes);
        productosPendientes = productosPendientes.map(function(el) {return el.id});
        await connection.query(
            `
            delete
            from deal
            where id_product in (?)
            `,
            [productosPendientes]
        );
        
        await connection.query(
            `
            delete
            from product
            where id_user = ?
            `,
            [2]
        );
        */ //Pruebas borrado usuario


    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

async function defineDB() {
    try {

        await connection.query("drop table if exists ratingTable");
        await connection.query("drop table if exists deal");
        await connection.query("drop table if exists product");
        await connection.query("drop table if exists user");
        console.log("hola");
        await connection.query(
            `
                create table user (
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
            );
            
            `
        );

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
            );
            
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
                startDate date not null ,
                endDate date not null ,
                accepted tinyint default null,
                constraint deal_id_deal_pk primary key (id),
                constraint deal_id_user_fk1 foreign key (id_user) references user(id) on delete cascade on update cascade ,
                constraint deal_id_product_fk2 foreign key (id_product) references product(id) on delete cascade on update cascade
            );
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
            );
            `
        );
    } catch (error) {
        console.error(error);
    }


}

main();

