import RegistroRepository from "../repositories/RegistroRepository";

class RegistroService {
    constructor() {
        this.RegistroRepository = new RegistroRepository();
    }

    async listar(req, res) {
        const registros = await this.RegistroRepository.list();
        res.json(registros);
    }

    async criar(req, res) {
        const novoRegistro = req.body;
        const id = await this.RegistroRepository.create(novoRegistro);
        res.status(201).json({ id });
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const registroAtualizado = req.body;
        await this.RegistroRepository.atualizar(id, registroAtualizado);
        res.status(204).send();
    }

    async deletar(req, res) {
        const { id } = req.params;
        await this.RegistroRepository.delete(id);
        res.status(204).send();
    }
}

export default RegistroService;