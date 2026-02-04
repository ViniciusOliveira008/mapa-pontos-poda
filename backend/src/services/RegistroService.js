import dbConnection from "../config/db.js";
import RegistroRepository from "../repositories/RegistroRepository.js";

class RegistroService {
    constructor() {
        this.registroRepository = new RegistroRepository(dbConnection);
    }

    async listar(req, res) {
        const registros = await this.registroRepository.listar();
        res.status(200).json(registros);
    }

    async criar(req, res) {
        const novoRegistro = req.body;
        const id = await this.registroRepository.criar(novoRegistro);
        res.status(201).json({ id });
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const registroAtualizado = req.body;
        await this.registroRepository.atualizar(id, registroAtualizado);
        res.status(204).send();
    }

    async deletar(req, res) {
        const { id } = req.params;
        await this.registroRepository.deletar(id);
        res.status(204).send();
    }
}

export default RegistroService;