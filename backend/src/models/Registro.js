class Registro {
    id;
    data_execucao;
    descricao;
    equipe;
    id_ponto;
    barramento;

    constructor (id, data_execucao, descricao, equipe, id_ponto, barramento) {
        this.id = id;
        this.data_execucao = data_execucao;
        this.descricao = descricao;
        this.equipe = equipe;
        this.id_ponto = id_ponto;
        this.barramento = barramento;
    }

    get_id () {
        return this.id;
    }

    get_data_execucao () {
        return this.data_execucao;
    }

    get_descricao () {
        return this.descricao;
    }

    get_equipe () {
        return this.equipe;
    }

    get_id_ponto () {
        return this.id_ponto;
    }

    get_barramento () {
        return this.barramento;
    }

    set_data_execucao (data_execucao) {
        this.data_execucao = data_execucao;
    }

    set_descricao (descricao) {
        this.descricao = descricao;
    }

    set_equipe (equipe) {
        this.equipe = equipe;
    }

    set_id_ponto (id_ponto) {
        this.id_ponto = id_ponto;
    }

    set_barramento (barramento) {
        this.barramento = barramento;
    }
}

export default Registro