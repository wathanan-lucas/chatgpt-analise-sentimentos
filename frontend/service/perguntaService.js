import axios from "axios";

const endpoint = "/sentimentos/"

const base = axios.create({
    baseURL: 'http://localhost:4000'
})

const realizarPergunta = (pergunta) => {
    return base.post(
        endpoint,
        pergunta,
        {headers: {'Content-Type': 'application/json'}}
    )
}

export {realizarPergunta}