import express from 'express'
import PontoRoute from './src/routes/PontoRoute.js'
import cors from 'cors'

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.listen(port, () => {
  console.log(`Exemplo de app rodando em http://localhost:${port}`)
})

app.use('/pontos', PontoRoute)

export default app 