class RegistroRepository {
    constructor(db) {
        this.db = db;
    }

    async listar() {
        const [rows] = await this.db.execute(
            'SELECT * FROM registros'
        );
        return rows;
    }

    async criar(registro, barramento, tipo_registro) {
        const [result] = await this.db.execute(
            `INSERT INTO registros 
            (data_execucao, descricao, equipe, id_ponto, barramento, tipo_registro) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                registro.data_execucao,
                registro.descricao,
                registro.equipe,
                registro.id_ponto,
                barramento,
                tipo_registro
            ]
        );
        return result.insertId;
    }

    async acharPorId(id) {
        const [rows] = await this.db.execute(
            'SELECT * FROM registros WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    async atualizar(id, registro) {
        await this.db.execute(
            `UPDATE registros 
             SET data_execucao = ?, 
                 descricao = ?, 
                 equipe = ?, 
                 id_ponto = ?, 
                 barramento = ?, 
                 tipo_registro = ?
             WHERE id = ?`,
            [
                registro.data_execucao,
                registro.descricao,
                registro.equipe,
                registro.id_ponto,
                registro.barramento,
                registro.tipo_registro,
                id
            ]
        );
    }

    async deletar(id) {
        await this.db.execute(
            'DELETE FROM registros WHERE id = ?',
            [id]
        );
    }
}

export default RegistroRepository;