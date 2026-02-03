    import PontoRepository from '../repositories/PontoRepository.js';
    import RegistroRepository from '../repositories/RegistroRepository.js';

    class PontoService {
        constructor(db) {
            this.PontoRepository = new PontoRepository(db);
            this.RegistroRepository = new RegistroRepository(db);
        };

        async listar(req, res) {
            const pontos = await this.PontoRepository.listar();
            res.json(pontos);
        };

        async criar(req, res) {
            const novoPonto = req.body;
            const id = await this.PontoRepository.criar(novoPonto);
            res.status(201).json({ id });
        };

        async atualizar(req, res) {
            const { id } = req.params;
            const pontoAtualizado = req.body;
            await this.PontoRepository.atualizar(id, pontoAtualizado);
            res.status(204).send();
        };

        async mudarStatus(req, res) {
            const { id } = req.params
            const registro = req.body
            console.log(registro)

            const ponto = await this.PontoRepository.encontrarPorId(id); 
            if (!ponto) { 
                return res.status(404).json({ error: 'Ponto não encontrado' });
            }

            let status = ''
            if (ponto.status_defeito == 'pendente') {
                status = 'executado'
            } else { status = 'pendente'}

            await this.RegistroRepository.criar(registro)
            await this.PontoRepository.mudarStatus(id, status);

            return res.status(200).json({ ponto: { ...ponto, status_defeito: status } });
        }
    }

    export default PontoService;