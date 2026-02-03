class PontoRepository {
  constructor(db) {
    this.db = db;
  }

  async listar() {
    const [rows] = await this.db.execute("SELECT * FROM pontos");
    return rows;
  }

  async listar_ativos() {
    const [rows] = await this.db.execute("SELECT * FROM pontos WHERE status_defeito = ?", ['pendente'])
    return rows;
  }

  async criar(ponto) {
    const [result] = await this.db.execute(
      "INSERT INTO pontos (id, numero_oi, tipo_plano, latitude, longitude, barramento, servico, status_defeito) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        ponto.id,
        ponto.numero_oi,
        ponto.tipo_plano,
        ponto.latitude,
        ponto.longitude,
        ponto.barramento,
        ponto.servico,
        ponto.status_defeito,
      ],
    );
    return result.insertId;
  }

  async encontrarPorId(id) {
    const [rows] = await this.db.execute("SELECT * FROM pontos WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async atualizar(id, ponto) {
    await this.db.execute(
      "UPDATE pontos SET numero_oi = ?, tipo_plano = ?, latitude = ?, longitude = ?, barramento = ?, servico = ?, status_defeito = ? WHERE id = ?",
      [
        ponto.numero_oi,
        ponto.tipo_plano,
        ponto.latitude,
        ponto.longitude,
        ponto.barramento,
        ponto.servico,
        ponto.status_defeito,
        id,
      ],
    );
  }

  async mudarStatus(id, status) {
    await this.db.execute (
      "UPDATE pontos SET status_defeito = ?  WHERE id = ? ", [status, id]
    );
  };
}

export default PontoRepository;
