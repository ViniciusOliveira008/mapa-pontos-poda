import RegistroService from "../services/RegistroService.js";
import express from 'express'
import dbConnection from "../config/db.js";

const registroRouter = express.Router()

const registroService = new RegistroService(dbConnection);

registroRouter.get('/listar', async (req, res) => registroService.listar(req, res));
registroRouter.post('/criar', async (req, res) => registroService.criar(req, res));
registroRouter.put('/atualizar/:id', async (req, res) => registroService.atualizar(req, res));
registroRouter.delete('/deletar/:id', async (req, res) => registroService.deletar(req, res));

export default registroRouter
