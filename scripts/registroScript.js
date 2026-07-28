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

      // Normaliza separadores (aceita 2026.08.27 ou 2026-08-27)
      const normalized = String(dataISO).replace(/\./g, "-");

      // Se vier como "dataT00:00:00Z" (apenas data com meia-noite UTC)
      // tratamos como "data pura" para evitar deslocamento por fuso horário
      if (normalized.includes("T")) {
        const [datePart, timePart = ""] = normalized.split("T");
        const timeOnly = timePart.replace(/Z$/i, "");
        if (/^00:00(:00)?$/.test(timeOnly) || /^00:00/.test(timeOnly)) {
          const [year, month, day] = datePart.split("-");
          if (!year || !month || !day) return "-";
          return `${day}/${month}/${year}`;
        }
      }

      // Fallback: usa Date e formata no locale (para casos com horário significativo)
      const d = new Date(dataISO);
      if (isNaN(d)) return "-";
      return d.toLocaleDateString("pt-BR");
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
