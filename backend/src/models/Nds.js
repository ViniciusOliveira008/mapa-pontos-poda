class Nds {
    id;
    latitude;
    longitude;
    barramento;
    servico;
    status_defeito;
    oc;
    numero_nds;

    constructor(
        id,
        latitude,
        longitude,
        barramento,
        servico,
        status_defeito,
        oc,
        numero_nds
    ) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.barramento = barramento;
        this.servico = servico;
        this.status_defeito = status_defeito;
        this.oc = oc;
        this.numero_nds = numero_nds;
    }

    /* ===== GETTERS ===== */

    get_id() {
        return this.id;
    }

    get_latitude() {
        return this.latitude;
    }

    get_longitude() {
        return this.longitude;
    }

    get_barramento() {
        return this.barramento;
    }

    get_servico() {
        return this.servico;
    }

    get_status_defeito() {
        return this.status_defeito;
    }

    get_oc() {
        return this.oc;
    }

    get_numero_nds() {
        return this.numero_nds;
    }

    /* ===== SETTERS ===== */

    set_id(id) {
        this.id = id;
    }

    set_latitude(latitude) {
        this.latitude = latitude;
    }

    set_longitude(longitude) {
        this.longitude = longitude;
    }

    set_barramento(barramento) {
        this.barramento = barramento;
    }

    set_servico(servico) {
        this.servico = servico;
    }

    set_status_defeito(status_defeito) {
        this.status_defeito = status_defeito;
    }

    set_oc(oc) {
        this.oc = oc;
    }

    set_numero_nds(numero_nds) {
        this.numero_nds = numero_nds;
    }
}

export default Nds;