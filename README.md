# Mapa Interativo de Pontos de Poda

Este projeto apresenta um mapa interativo para visualização de pontos de poda, utilizando as bibliotecas **Leaflet**, **PapaParse** e **MarkerCluster**. O sistema foi desenvolvido para facilitar a análise geográfica e a tomada de decisão em operações de poda.

## ✨ Funcionalidades
- Exibição de pontos georreferenciados com clusterização para melhor desempenho.
- Filtros dinâmicos por tipo de serviço:
  - **Poda de BT** (verde)
  - **Poda de MT** (vermelho)
  - **Trocar Isolador** (azul)
- Localização automática do usuário (quando autorizada pelo navegador).
- Pop-ups com informações detalhadas: **OI**, **Barramento**, **Tipo** e **Serviço**.

## 📂 Estrutura do Projeto
```
📁 projeto-mapa-poda/
 ├── index.html              # Código principal do mapa
 ├── pontos_corrigido.csv    # Arquivo de dados (separador ponto e vírgula)
```

## 🛠 Requisitos
- Navegador moderno (Chrome, Edge, Firefox).
- Servir via **HTTPS** ou **localhost** para habilitar geolocalização.
- Arquivo CSV com cabeçalho:
```
Numero OI;Tipo Plano;Latitude;Longitude;Barramento;Serviço
```
Valores aceitos para a coluna **Serviço**:
- `Poda de BT` → marcador verde
- `Poda de MT` → marcador vermelho
- `Trocar Isolador` → marcador azul

## 🚀 Como Utilizar
1. Coloque `index.html` e `pontos_corrigido.csv` na mesma pasta.
2. Abra `index.html` em um navegador ou utilize um servidor local.
3. Utilize os filtros no canto superior esquerdo para exibir apenas os serviços desejados.
4. Clique em **📍 Localizar** para centralizar sua posição no mapa.

## 🔍 Observações
- A geolocalização só funciona via **HTTPS** ou **localhost**.
- O CSV deve utilizar **ponto e vírgula (;)** como separador.
- O código é tolerante a variações no cabeçalho e no conteúdo (acentos, espaços, maiúsculas).

## 🖼 Ícones
- Ícones carregados via URL (estilo pino):
  - Verde → Poda de BT
  - Vermelho → Poda de MT
  - Azul → Trocar Isolador

## 🔄 Atualização dos Dados
Para atualizar os pontos exibidos, substitua o arquivo `pontos_corrigido.csv` pelo novo arquivo com os dados atualizados.
