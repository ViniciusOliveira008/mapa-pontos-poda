    import PontoRepository from '../repositories/PontoRepository.js';

    class PontoService {
        constructor(db) {
            this.PontoRepository = new PontoRepository(db);
        };

        async listar(req, res) {
            const pontos = await this.PontoRepository.list();
            res.json(pontos);
        };

        async criar(req, res) {
            const novoPonto = req.body;
            const id = await this.PontoRepository.create(novoPonto);
            res.status(201).json({ id });
        };

        async atualizar(req, res) {
            const { id } = req.params;
            const pontoAtualizado = req.body;
            await this.PontoRepository.update(id, pontoAtualizado);
            res.status(204).send();
        };
    }

    export default PontoService;