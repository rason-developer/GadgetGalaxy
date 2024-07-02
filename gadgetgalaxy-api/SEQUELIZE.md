# Sequelize Commands

This file provides a sequence of commands to set up and manage the Sequelize setup for the GadgetGalaxy project.

## Installation

1. Install Sequelize and Sequelize CLI globally:

    ```bash
    npm install -g sequelize-cli
    ```

2. Install Sequelize, pg (PostgreSQL), and pg-hstore in your project:

    ```bash
    npm install sequelize pg pg-hstore
    ```

## Initialize Sequelize

1. Initialize Sequelize in your project directory:

    ```bash
    npx sequelize-cli init
    ```

    This creates the following folders:
    - `config`
    - `models`
    - `migrations`
    - `seeders`

2. Edit the `config/config.json` file to set up your database configuration. Example configuration for PostgreSQL:

        {
        "development": {
            "username": "your username",
            "password": "your password",
            "database": "gadgetgalaxy_dev",
            "host": "localhost",
            "dialect": "postgres",
            "port": your port,  
            "logging": true,  
            "dialectOptions": {
            "ssl": false 
            }
        },
        "test": {
            "username": "your username",
            "password": "your password",
            "database": "gadgetgalaxy_dev",
            "host": "localhost",
            "dialect": "postgres",
            "port": your port,  
            "logging": false,  
            "dialectOptions": {
            "ssl": false 
            }
        },
        "production": {
           "username": "your username",
            "password": "your password",
            "database": "gadgetgalaxy_dev",
            "host": "localhost",
            "dialect": "postgres",
            "port": your port,  
            "logging": false,  
            "dialectOptions": {
            "ssl": true  
            "rejectUnauthorized": false 
            }
        }
        }
            

## Create Models

1. Create the User model and migration:

    ```bash
    npx sequelize-cli model:generate --name User --attributes id:UUID,username:string,password:string,role:enum:{admin,customer}
    ```

2. Create the Product model and migration:

    ```bash
    npx sequelize-cli model:generate --name Product --attributes id:UUID,name:string,description:text,price:decimal,stock:integer,categoryId:UUID
    ```

3. Create the Order model and migration:

    ```bash
    npx sequelize-cli model:generate --name Order --attributes id:UUID,userId:UUID,totalAmount:decimal,status:enum:{pending,shipped,delivered,cancelled}
    ```

4. Create the Review model and migration:

    ```bash
    npx sequelize-cli model:generate --name Review --attributes id:UUID,productId:UUID,userId:UUID,rating:integer,comment:text
    ```

5. Create the OrderProducts join table migration:

    ```bash
    npx sequelize-cli migration:generate --name create-order-products
    ```

## Define Relationships

1. Open `models/index.js` and define relationships:

    ```javascript
    const Sequelize = require('sequelize');
    const config = require('../config/database');
    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    const User = require('./user')(sequelize, Sequelize.DataTypes);
    const Product = require('./product')(sequelize, Sequelize.DataTypes);
    const Order = require('./order')(sequelize, Sequelize.DataTypes);
    const Review = require('./review')(sequelize, Sequelize.DataTypes);

    // Relationships
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User, { foreignKey: 'userId' });

    User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo(User, { foreignKey: 'userId' });

    Product.hasMany(Review, { foreignKey: 'productId' });
    Review.belongsTo(Product, { foreignKey: 'productId' });

    Order.belongsToMany(Product, { through: 'OrderProducts' });
    Product.belongsToMany(Order, { through: 'OrderProducts' });

    module.exports = {
      sequelize,
      User,
      Product,
      Order,
      Review
    };
    ```

## Run Migrations

1. Run the migrations to create the tables in the database:

    ```bash
    npx sequelize-cli db:migrate
    ```

## Additional Commands

1. To create a new migration:

    ```bash
    npx sequelize-cli migration:generate --name migration_name
    ```

2. To undo the last migration:

    ```bash
    npx sequelize-cli db:migrate:undo
    ```

3. To undo all migrations:

    ```bash
    npx sequelize-cli db:migrate:undo:all
    ```

4. To seed the database:

    ```bash
    npx sequelize-cli db:seed:all
    ```

5. To undo all seeds:

    ```bash
    npx sequelize-cli db:seed:undo:all
    ```

By following these commands and steps, you can set up and manage the database schema for the GadgetGalaxy project using Sequelize.
