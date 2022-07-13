import { Sequelize } from "sequelize/types";
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Posts = db.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    }
});

export default Posts;