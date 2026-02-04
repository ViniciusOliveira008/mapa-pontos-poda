import RegistroService from "../services/RegistroService";
import express from express 
import dbConnection from "../config/db";

const registroService = new RegistroService(dbConnection);

const registroRouter = express.Router()

registroRouter.get('/listar', async (req, res) => registroService.listar(req, res));
registroRouter.post('/criar', async (req, res) => registroService.criar(req, res));
registroRouter.put('/atualizar/:id', async (req, res) => registroService.atualizar(req, res));
registroRouter.delete('/deletar/:id', async (req, res) => registroService.deletar(req, res));

export default registroRouter
