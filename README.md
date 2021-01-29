# Proveedor perfecto

Languages availables:

* [Spanish](https://github.com/Federicosuarezpa/Proveedor-perfecto/blob/main/español.md)
* [English](https://github.com/Federicosuarezpa/Proveedor-perfecto/blob/main/README.md)
* [German](https://github.com/Federicosuarezpa/Proveedor-perfecto/blob/main/deutch.md) - in development 🛠️

Web page that has been made as a final project of a full stack developer bootcamp.

The web page is a portal to exchange services, it's a B2B system where al client can be a provider and all provider can be a cliente.

The portal has been developed with react and node

## Starting 🚀


_The detailed instructions below will allow you to have a copy of the project in your local repository to test it and even add functionalities if you wish_

See the ** Deployment ** section to know how to deploy the project on your machine.

### Pre-requisites 📋

_¿Which software do you need?_

* [npm](https://docs.npmjs.com/cli/v6/commands/npm-install)
* [node](https://nodejs.org/en/) 

<h2>Backend dependencies:</h2>
<p>Some of the dependencies like "faker" are not necessary, they are used to be able to generate a test database to carry out functionality tests.</p>

* [@sendgrid/mail](https://sendgrid.com/) - npm install --save @sendgrid/mail </li>
* [body-parser](https://www.npmjs.com/package/body-parser) - npm install body-parser</li>
* [Crypto-js](https://www.npmjs.com/package/crypto-js) - npm install crypto-js</li>
* [date-fns](https://www.npmjs.com/package/date-fns) - npm install date-fns</li>
* [dotenv](https://www.npmjs.com/package/dotenv) - npm install dotenv</li>
* [express-fileupload](https://www.npmjs.com/package/express-fileupload) - npm i express-fileupload</li>
* [faker](https://www.npmjs.com/package/faker) - npm install faker</li>
* [fs-extra](https://www.npmjs.com/package/fs-extra) - npm install fs-extra</li>
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)- npm install jsonwebtoken</li>
* [lodash](https://www.npmjs.com/package/lodash) - npm install lodash</li>
* [morgan](https://www.npmjs.com/package/morgan) - npm install morgan</li>
* [mysql2](https://www.npmjs.com/package/mysql2) - npm install --save mysql2</li>
* [sharp](https://www.npmjs.com/package/sharp) - npm install sharp</li>
* [uuid](https://www.npmjs.com/package/uuid) - npm install uuid</li>

_If you want to know something more about dependencies you can read [Dependencies.md]._

<h2>Frontend in development</h2>

## Deployment 📦

_First of all we need to clone the repository_

Open the terminal and type the next command: 

_git clone https://github.com/Federicosuarezpa/Proveedor-perfecto.git_

After this, we'll have a copy of the project on our machine. Now we need dependencies, we can go into back folder and open the project with an IDE as VSCode,
then we write in our terminal, from the IDE in case it having:

_npm install_

Now you need to create a database with a name you like and use it, you can use the nexts commands:
```
create database if not exists perfect_supplier character set = 'utf8mb4' collate = 'utf8mb4_spanish_ci';

use perfect_supplier;
```
This commands can be run from a terminal if you've mysql installed.

[info about mysql](https://dev.mysql.com/doc/refman/8.0/en/creating-database.html)

Then we've the DB, to create the tables just execute de js file "initDB.js" with the commmand:
```
node initDB.js
```

At this precise moment we will be able to execute the backend of the server with the command:
```
npm run dev
```

Good job! Now you can login, register and do whatever you want! Enjoy it, feedback is welcome ✒️.

Example:
![alt text](https://github.com/Federicosuarezpa/Proveedor-perfecto/blob/main/images/login.PNG)

## Developed with 🛠️
* [React](https://es.reactjs.org/) - The web framework used.
* [Node](https://nodejs.org/en/) - Used to do the backend.
* [mysql](https://www.mysql.com/) - The database software used.

 ## Authors ✒️
 * **Federico Hernán Suárez Palavecino** - [Federicosuarezpa](https://github.com/Federicosuarezpa)
 * **Alejandro Rojas** - [AlexRed84](https://github.com/AlexRed84)


