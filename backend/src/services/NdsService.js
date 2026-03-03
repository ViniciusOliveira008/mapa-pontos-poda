import NdsRepository from '../repositories/NdsRepository.js';
import RegistroRepository from '../repositories/RegistroRepository.js';

class NdsService {
    constructor(db) {
        this.NdsRepository = new NdsRepository(db);
        this.RegistroRepository = new RegistroRepository(db);
    }

    async listar(req, res) {
        const nds = await this.NdsRepository.listar();
        res.status(200).json(nds);
    }

    async listar_pendentes(req, res) {
        const nds = await this.NdsRepository.listar_pendentes();
        res.status(200).json(nds);
    }

    async listar_executados(req, res) {
        const nds = await this.NdsRepository.listar_executados();
        res.status(200).json(nds);
    }

    async criar(req, res) {
        const novaNds = req.body;
        const id = await this.NdsRepository.criar(novaNds);
        res.status(201).json({ id });
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const ndsAtualizada = req.body;

        await this.NdsRepository.atualizar(id, ndsAtualizada);

        res.status(204).send();
    }

    async executarNds(req, res) {
        const { id } = req.params;
        const registro = req.body;

        const nds = await this.NdsRepository.encontrarPorId(id);

        if (!nds) {
            return res.status(404).json({ error: 'NDS não encontrada' });
        }

        if (nds.status_defeito === "executado") {
            return res.status(400).json({ error: 'NDS já executada' });
        }

        const barramento = nds.barramento;

        await this.RegistroRepository.criar(registro, barramento);
        await this.NdsRepository.executarNds(id);

        return res.status(200).json({
            nds: { ...nds, status_defeito: "executado" }
        });
    }
}

export default NdsService;