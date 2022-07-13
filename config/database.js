import { Sequelize } from "sequelize/types";

const sequelize = new Sequelize('pinterest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('Database connected.');
} catch (error) {
    console.log('Database not connected.');
}

export default sequelize;