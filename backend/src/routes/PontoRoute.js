import PontoService from '../services/PontoService.js';
import express from 'express' 
import dbConnection from '../config/db.js';

const router = express.Router();

const pontoService = new PontoService(dbConnection);

router.get('/listar', async (req, res) => pontoService.listar(req, res));
router.post('/criar', async (req, res) => pontoService.criar(req, res));
router.put('/atualizar/:id', async (req, res) => pontoService.atualizar(req, res));

export default router;
