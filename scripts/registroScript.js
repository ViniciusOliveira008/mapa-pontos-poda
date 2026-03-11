    let todosRegistros = [];
    let tipoAtual = "todos";
    let ordemAtual = "desc";

    fetch("https://mapa-pontos-poda.onrender.com/registros/listar")
      .then(r => r.json())
      .then(data => {
        todosRegistros = data;
        aplicarFiltros();
      });

    function formatarData(dataISO) {
      if (!dataISO) return "-";
      const data = new Date(dataISO);
      return data.toLocaleDateString("pt-BR");
    }

    function aplicarFiltros() {
      let lista = [...todosRegistros];

      // 🔹 Filtro por tipo
      if (tipoAtual !== "todos") {
        lista = lista.filter(r => r.tipo_registro === tipoAtual);
      }

      // 🔹 Ordenação por ID
      lista.sort((a, b) => {
        return ordemAtual === "asc"
          ? a.id - b.id   // menor primeiro
          : b.id - a.id;  // maior primeiro
      });

      renderizar(lista);
    }

    function renderizar(lista) {
      const container = document.getElementById("lista-nds");
      container.innerHTML = "";

      lista.forEach(row => {
        container.innerHTML += `
          <div class="card">
            <h3>Registro ${row.id}</h3>

            <p><span class="label">📍 Ponto:</span> ${row.id_ponto}</p>
            <p><span class="label">👷 Equipe:</span> ${row.equipe}</p>
            <p><span class="label">📅 Execução:</span> ${formatarData(row.data_execucao)}</p>
            <p><span class="label">📝 Descrição:</span> ${row.descricao}</p>
            <p><span class="label">🔌 Barramento:</span> ${row.barramento}</p>

            ${
              row.numero_nds
                ? `<p><span class="label">🔢 Nº NDS:</span> ${row.numero_nds}</p>`
                : ""
            }

            <p>
              <span class="label">Tipo:</span>
              <span class="badge ${row.tipo_registro}">
                ${row.tipo_registro.toUpperCase()}
              </span>
            </p>
          </div>
        `;
      });
    }

    document.getElementById("filtroTipo")
      .addEventListener("change", function () {
        tipoAtual = this.value;
        aplicarFiltros();
      });

    document.getElementById("ordenarId")
      .addEventListener("change", function () {
        ordemAtual = this.value;
        aplicarFiltros();
      });