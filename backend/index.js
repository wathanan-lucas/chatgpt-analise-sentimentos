const express = require('express')
const app = express()
//midleware
app.use(express.json())

// GET localhost:4000/hello -> {"mensagem": "Hello direto do Back-endnpm,"}
app.get('/hello', (req, res) => {
    res.json({mensagem: "Hello direto do Back end"})
})

// POST localhost:4000/sentimentos

const porta = 400

app.listen(porta, () => console.log(`Servidor OK. Porta ${porta}`))