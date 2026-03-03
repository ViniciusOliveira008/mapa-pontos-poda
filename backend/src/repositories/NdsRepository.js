class NdsRepository {
  constructor(db) {
    this.db = db;
  }

  async listar() {
    const [rows] = await this.db.execute("SELECT * FROM nds");
    return rows;
  }

  async listar_pendentes() {
    const [rows] = await this.db.execute(
      "SELECT * FROM nds WHERE status_defeito = ?",
      ["pendente"]
    );
    return rows;
  }

  async listar_executados() {
    const [rows] = await this.db.execute(
      "SELECT * FROM nds WHERE status_defeito = ?",
      ["executado"]
    );
    return rows;
  }

  async criar(nds) {
    const [result] = await this.db.execute(
      `INSERT INTO nds 
       (id, latitude, longitude, barramento, servico, status_defeito, oc, numero_nds) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nds.id,
        nds.latitude,
        nds.longitude,
        nds.barramento,
        nds.servico,
        nds.status_defeito,
        nds.oc,
        nds.numero_nds,
      ]
    );

    return result.insertId;
  }

  async encontrarPorId(id) {
    const [rows] = await this.db.execute(
      "SELECT * FROM nds WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async atualizar(id, nds) {
    await this.db.execute(
      `UPDATE nds 
       SET latitude = ?, 
           longitude = ?, 
           barramento = ?, 
           servico = ?, 
           status_defeito = ?, 
           oc = ?, 
           numero_nds = ?
       WHERE id = ?`,
      [
        nds.latitude,
        nds.longitude,
        nds.barramento,
        nds.servico,
        nds.status_defeito,
        nds.oc,
        nds.numero_nds,
        id,
      ]
    );
  }

  async executarNds(id) {
    await this.db.execute(
      "UPDATE nds SET status_defeito = 'executado' WHERE id = ?",
      [id]
    );
  }
}

export default NdsRepository;