import PontoService from '../services/PontoService.js';
import express from 'express' 
import dbConnection from '../config/db.js';

const pontoRouter = express.Router();

const pontoService = new PontoService(dbConnection);

pontoRouter.get('/listar', async (req, res) => pontoService.listar(req, res));
pontoRouter.get('/listar_pendentes', async (req, res) => pontoService.listar_pendentes(req, res));
pontoRouter.get('/listar_executados', async (req, res) => pontoService.listar_executados(req, res))
pontoRouter.post('/criar', async (req, res) => pontoService.criar(req, res));
pontoRouter.put('/atualizar/:id', async (req, res) => pontoService.atualizar(req, res));
pontoRouter.post('/executar/:id', async (req, res) => pontoService.executarPonto(req, res));

export default pontoRouter;
