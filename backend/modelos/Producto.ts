import sequelize from '../db/connection';
import { DataTypes } from 'sequelize';

const Producto = sequelize.define('Producto', {
    idProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    categoria: {
        type: DataTypes.STRING,
    },
    url_fotografia: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Producto',
    timestamps: false,
});

export default Producto;
