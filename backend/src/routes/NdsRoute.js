import NdsService from '../services/NdsService.js';
import express from 'express';
import dbConnection from '../config/db.js';

const ndsRouter = express.Router();

const ndsService = new NdsService(dbConnection);

ndsRouter.get('/listar', async (req, res) => 
  ndsService.listar(req, res)
);

ndsRouter.get('/listar_pendentes', async (req, res) => 
  ndsService.listar_pendentes(req, res)
);

ndsRouter.get('/listar_executados', async (req, res) => 
  ndsService.listar_executados(req, res)
);

ndsRouter.post('/criar', async (req, res) => 
  ndsService.criar(req, res)
);

ndsRouter.put('/atualizar/:id', async (req, res) => 
  ndsService.atualizar(req, res)
);

ndsRouter.post('/executar/:id', async (req, res) => 
  ndsService.executarNds(req, res)
);

export default ndsRouter;