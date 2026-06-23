import express, { Request, Response } from 'express';
import cors from 'cors';
import Producto from './modelos/Producto';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/productos', async (_req: Request, res: Response) => {
    try {
        const productos = await Producto.findAll();

        if (productos.length > 0) {
            return res.status(200).json({
                message: 'Productos obtenidos correctamente',
                data: productos,
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron productos',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Error al obtener los productos',
            error: error.message,
        });
    }
});

app.post('/productos', async (req: Request, res: Response) => {
    try {
        const producto = await Producto.create(req.body);

        if (producto) {
            return res.status(200).json({
                message: 'Producto creado correctamente',
                data: producto,
            });
        } else {
            res.status(400).json({
                message: 'Error al crear el producto',
                error: 'No se pudo crear el producto',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Error al crear el producto',
            error: error.message,
        });
    }
});

app.delete('/items/:id', async (req: Request, res: Response) => {
    try {
        const producto = await Producto.destroy({
            where: {
                idProducto: req.params.id,
            },
        });

        if (producto) {
            return res.status(200).json({
                message: 'Producto eliminado correctamente',
                data: producto,
            });
        } else {
            res.status(400).json({
                message: 'Error al eliminar el producto',
                error: 'No se pudo eliminar el producto',
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Error al eliminar el producto',
            error: error.message,
        });
    }
});

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
