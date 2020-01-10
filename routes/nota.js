import express from 'express';
const router = express.Router();

// importar el modelo nota
import Nota from '../models/nota';

// Agregar una nota
router.post('/nueva-nota', async(req, res) => {
    const body = req.body;

    try {
        const notaDB = await Nota.create(body);
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// GET con parametros
router.get('/nota/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const notaDB = await Nota.findOne({ _id });
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// GET con todos los documentos
router.get('/nota', async(req, res) => {
    try {
        const notaDB = await Nota.find();
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// DELETE eliminar una nota
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findByIdAndDelete({ _id });
        if (!notaDB) {
            return res.status(400).json({
                mensaje: 'Ocurrio un error',
                error
            });
        }
        res.status(200).json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// PUT actualizar una nota
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const notaDB = await Nota.findByIdAndUpdate(
            _id,
            body, { new: true }
        );
        res.json(notaDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        });
    }
});

// Exportacion del router
module.exports = router;