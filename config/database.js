import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('pinterest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false
    }
});

try {
    sequelize.authenticate();
    console.log('Database connected.');
} catch (error) {
    console.log('Database not connected.');
}

export default sequelize;