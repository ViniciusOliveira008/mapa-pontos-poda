import RegistroService from "../services/RegistroService";
import express from express 

router = express.Router()

router.get('/listar', async (req, res) => RegistroService.listar(req, res));
router.post('/criar', async (req, res) => RegistroService.criar(req, res));
router.put('/atualizar/:id', async (req, res) => RegistroService.atualizar(req, res));
router.delete('/deletar/:id', async (req, res) => RegistroService.deletar(req, res));
