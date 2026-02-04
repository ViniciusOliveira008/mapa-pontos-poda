import express from 'express'
import pontoRouter from './src/routes/PontoRoute.js'
import registroRouter from './src/routes/RegistroRoute.js'
import cors from 'cors'
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000 

app.get('/', (req, res) => {
  res.send('Olá Mundo!')
})

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})

app.use('/pontos', pontoRouter)
app.use('/registros', registroRouter)

export default app 