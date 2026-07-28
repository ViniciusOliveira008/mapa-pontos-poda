    import PontoRepository from '../repositories/PontoRepository.js';
    import RegistroRepository from '../repositories/RegistroRepository.js';

    class PontoService {
        constructor(db) {
            this.PontoRepository = new PontoRepository(db);
            this.RegistroRepository = new RegistroRepository(db);
        };

        async listar(req, res) {
            const pontos = await this.PontoRepository.listar();
            res.status(200).json(pontos);
        };

        async listar_pendentes(req, res) {
            const pontos = await this.PontoRepository.listar_pendentes();
            res.status(200).json(pontos);
        }

        async listar_executados(req, res) {
            const pontos = await this.PontoRepository.listar_executados();
            res.status(200).json(pontos)
        }
 
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

        async executarPonto(req, res) {
            const { id } = req.params
            const registro = req.body

            const ponto = await this.PontoRepository.encontrarPorId(id); 
            if (!ponto) { 
                return res.status(404).json({ error: 'Ponto não encontrado' });
            }

            if (ponto.status_defeito == "executado") {
                return res.status(400).json({ error: 'Ponto já executado' });
            }

            const barramento = ponto.barramento

            await this.RegistroRepository.criar(registro, barramento, 'manutencao')
            await this.PontoRepository.executarPonto(id);

            return res.status(200).json({ ponto: { ...ponto, status_defeito: "executado" } });
        }

        async criarManual(req, res) {
            try {
                const { latitude, longitude, barramento, servico, descricao } = req.body;

                if (!latitude || !longitude || !barramento) {
                    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
                }

                const id = await this.PontoRepository.criarManual({
                    latitude,
                    longitude,
                    barramento,
                    servico,
                    status_defeito: "pendente"
                });

                return res.status(201).json({ id });

            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao criar ponto manual' });
            }
        }

        async listar_manuais(req, res) {
            const pontos = await this.PontoRepository.listarManuais();
            res.status(200).json(pontos);
        }

    }

    export default PontoService;