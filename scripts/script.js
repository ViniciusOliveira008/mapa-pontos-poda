let coordMode = false
let coordMarker = null

const normalize = s => String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()
const toFloat = v => { const n = parseFloat(String(v).replace(',','.')); return isNaN(n)?null:n }

const map = L.map('map').setView([-5.9,-35.29],12)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

const icons = {
  green: L.icon({iconUrl:'https://maps.google.com/mapfiles/ms/icons/green-dot.png',iconSize:[32,32]}),
  red: L.icon({iconUrl:'https://maps.google.com/mapfiles/ms/icons/red-dot.png',iconSize:[32,32]}),
  blue: L.icon({iconUrl:'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',iconSize:[32,32]}),
  user: L.icon({iconUrl:'https://cdn-icons-png.flaticon.com/512/684/684908.png',iconSize:[32,32]})
}

const markers = L.markerClusterGroup()
map.addLayer(markers)

const btMarkers=[], mtMarkers=[], tiMarkers=[]
let pontoSelecionadoId = null

fetch('https://mapa-pontos-poda.onrender.com/pontos/listar_pendentes')
  .then(r=>r.json())
  .then(data=>{
    data.forEach(row=>{
      const lat = toFloat(row.latitude)
      const lon = toFloat(row.longitude)
      if(!lat||!lon) return

      const s = normalize(row.servico)
      let icon, arr
      if(s.includes('poda de bt')){icon=icons.green;arr=btMarkers}
      else if(s.includes('poda de mt')){icon=icons.red;arr=mtMarkers}
      else if(s.includes('trocar isolador')){icon=icons.blue;arr=tiMarkers}
      else return

      const marker = L.marker([lat,lon],{icon})
        .bindPopup(`
          <b>OI:</b> ${row.numero_oi}<br>
          <b>Barramento:</b> ${row.barramento}<br>
          <b>Serviço:</b> ${row.servico}<br><br>
          <button onclick="abrirModal(${row.id})" style="
            background-color:#28a745;
            color:#fff;
            border:none;
            border-radius:6px;
            padding:8px 14px;
            font-size:14px;
            font-weight:600;
            cursor:pointer;
            width:100%;"
          >Executar</button>
        `)

      arr.push(marker)
      markers.addLayer(marker)
    })
  })

const update = (arr,show)=>arr.forEach(m=>show?markers.addLayer(m):markers.removeLayer(m))
chkBT.onchange=e=>update(btMarkers,e.target.checked)
chkMT.onchange=e=>update(mtMarkers,e.target.checked)
chkTI.onchange=e=>update(tiMarkers,e.target.checked)

function abrirModal(id){
  pontoSelecionadoId=id
  inputEquipe.value=''
  inputData.value=''
  inputDescricao.value=''
  modalExecucao.style.display='block'
}

function fecharModal(){
  modalExecucao.style.display='none'
  pontoSelecionadoId=null
}

function confirmarExecucao(){
  const equipe=inputEquipe.value.trim()
  const data=inputData.value

  if(!equipe || !data){
    alert('Equipe e data são obrigatórios')
    return
  }

  fetch(`https://mapa-pontos-poda.onrender.com/pontos/executar/${pontoSelecionadoId}`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      equipe,
      data_execucao: data,
      descricao: inputDescricao.value,
      id_ponto: pontoSelecionadoId,
    })
  })
  .then(r=>{
    if(r.status===400) throw new Error('BAD_REQUEST')
    if(!r.ok) throw new Error('ERROR')

    markers.eachLayer(m=>{
      if(m.getPopup()?.getContent().includes(`abrirModal(${pontoSelecionadoId})`)){
        markers.removeLayer(m)
      }
    })

    fecharModal()
  })
  .catch(err=>{
    if(err.message === 'BAD_REQUEST'){
      alert('Ponto já executado!')
    }else{
      alert('Erro ao executar ponto')
    }
  })
}

let userLat,userLon,userMarker
navigator.geolocation?.getCurrentPosition(p=>{
  userLat=p.coords.latitude
  userLon=p.coords.longitude
  userMarker=L.marker([userLat,userLon],{icon:icons.user}).addTo(map)
})

function goToLocation(){
  if(userLat&&userLon){
    map.setView([userLat,userLon],16)
  }
}

function toggleCoordMode(){
  coordMode = !coordMode

  alert(coordMode 
    ? 'Modo de coordenadas ATIVADO. Clique no mapa.'
    : 'Modo de coordenadas DESATIVADO.'
  )
}

function identificarServico(servicoInput) {
  const s = normalize(servicoInput)

  if (
    s.includes('bt') ||
    s.includes('poda bt') ||
    s.includes('poda de bt')
  ) {
    return {
      tipo: 'Poda de BT',
      icon: icons.green
    }
  }

  if (
    s.includes('mt') ||
    s.includes('poda mt') ||
    s.includes('poda de mt')
  ) {
    return {
      tipo: 'Poda de MT',
      icon: icons.red
    }
  }

  if (
    s.includes('ti') ||
    s.includes('isolador') ||
    s.includes('trocar isolador')
  ) {
    return {
      tipo: 'Trocar Isolador',
      icon: icons.blue
    }
  }

  return null
}

map.on('click', function(e){
  if(!coordMode) return

  const lat = e.latlng.lat
  const lng = e.latlng.lng

  const barramento = prompt('Barramento:')
  if(!barramento) return

  const servicoInput = prompt('Tipo de serviço (BT, MT, TI):') || ''
  const descricao = prompt('Descrição (opcional):') || ''

  const servicoInfo = identificarServico(servicoInput)

  if (!servicoInfo) {
    alert('Serviço inválido! Use BT, MT ou TI')
    return
  }


  fetch('https://mapa-pontos-poda.onrender.com/pontos/criar_manual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      latitude: lat,
      longitude: lng,
      barramento,
      servico: servicoInfo.tipo,
      descricao
    })
  })
  .then(r => r.json())
  .then(() => {

    const marker = L.marker([lat, lng], {
      icon: servicoInfo.icon
    }).bindPopup(`
      <b>Ponto manual</b><br>
      <b>Barramento:</b> ${barramento}<br>
      <b>Serviço:</b> ${servicoInfo.tipo}<br>
      ${descricao}
    `)

    markers.addLayer(marker)

    //desativa o modo coordenadas depois da criação do ponto
    coordMode = false
    alert('Ponto criado! Modo de coordenadas desativado.')
  })
  .catch(() => {
    alert('Erro ao salvar ponto')
  })
})

fetch('https://mapa-pontos-poda.onrender.com/pontos/listar_manuais')
  .then(r => r.json())
  .then(data => {

    data.forEach(p => {

      const servicoInfo = identificarServico(p.servico)

      if (!servicoInfo) return

      const marker = L.marker([p.latitude, p.longitude], {
        icon: servicoInfo.icon
      }).bindPopup(`
        <b>Ponto manual</b><br>
        <b>Barramento:</b> ${p.barramento}<br>
        <b>Serviço:</b> ${servicoInfo.tipo}<br>
        ${p.descricao || ''}
      `)

      markers.addLayer(marker)
    })

  })