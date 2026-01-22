class Ponto {
    id;
    numero_oi;
    tipo_plano;
    latitude;
    longitude;
    barramento;
    servico;
    status_defeito;

    constructor (id, numero_oi, tipo_plano, latitude, longitude, barramento, servico, status_defeito) {
        this.id = id;
        this.numero_oi = numero_oi;
        this.tipo_plano = tipo_plano;
        this.latitude = latitude;
        this.longitude = longitude;
        this.barramento = barramento;
        this.servico = servico;
        this.status_defeito = status_defeito;
    }

    get_id () {
        return this.id;
    }

    get_numero_oi () {
        return this.numero_oi;
    }

    get_tipo_plano () {
        return this.tipo_plano;
    }

    get_latitude () {
        return this.latitude;
    }

    get_longitude () {
        return this.longitude;
    }

    get_barramento () {
        return this.barramento;
    }

    get_servico () {
        return this.servico;
    }

    get_status_defeito () {
        return this.status_defeito;
    }

    set_id (id) {
        this.id = id; 
    }

    set_numero_oi (numero_oi) {
        this.numero_oi = numero_oi;
    }

    set_tipo_plano (tipo_plano) {
        this.tipo_plano = tipo_plano;
    }

    set_latitude (latitude) {
        this.latitude = latitude;
    }

    set_longitude (longitude) {
        this.longitude = longitude;
    }

    set_barramento (barramento) {
        this.barramento = barramento;
    }

    set_servico (servico) {
        this.servico = servico;
    }

    set_status_defeito (status_defeito) {
        this.status_defeito = status_defeito;
    }
}

export default Ponto