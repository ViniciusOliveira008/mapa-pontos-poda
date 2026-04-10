class PontoRepository {
  constructor(db) {
    this.db = db;
  }

  async listar() {
    const [rows] = await this.db.execute("SELECT * FROM pontos");
    return rows;
  }

  async listar_pendentes () {
    const [rows] = await this.db.execute("SELECT * FROM pontos WHERE status_defeito = ?", ['pendente'])
    return rows;
  }

  async listar_executados() {
    const [rows] = await this.db.execute("SELECT * FROM pontos WHERE status_defeito = ?", ["executado"])
    return rows 
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

  async executarPonto(id) {
    await this.db.execute (
      "UPDATE pontos SET status_defeito = 'executado'  WHERE id = ? ", [id]
    );
  };
  
  async criarManual(ponto) {
  const { latitude, longitude, barramento, servico, status_defeito } = ponto;

  console.log("VALORES:", {
    latitude,
    longitude,
    barramento,
    servico,
    status_defeito
  });

  // 1️⃣ Insere em pontos_manuais
  const [resultManual] = await this.db.query(`
    INSERT INTO pontos_manuais 
    (latitude, longitude, barramento, servico, status_defeito)
    VALUES (?, ?, ?, ?, ?)
  `, [latitude, longitude, barramento, servico, status_defeito]);

  // 2️⃣ Insere também em pontos
  const [resultPontos] = await this.db.query(`
    INSERT INTO pontos 
    (numero_oi, tipo_plano, latitude, longitude, barramento, servico, status_defeito)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    null, // numero_oi
    null, // tipo_plano
    latitude,
    longitude,
    barramento,
    servico,
    status_defeito || 'pendente'
  ]);

  return {
    id_manual: resultManual.insertId,
    id_ponto: resultPontos.insertId
  };
  }
}

export default PontoRepository;
