const data = require('./data_computer.json')
const express = require('express')

const app = express()
app.use(express.json())

//rota para ver todos dados ou filtrar por nome
app.get('/',(req, res)=>{
    
    //ver se tem conteudo no name
    if(req.query.name){
        const name = Object.keys(data)

        const filter_name = req.query.name
        const resul = name.filter(item => item === filter_name)
        
    
        res.json(data[resul])
    }

    res.json(data)
    }
)


app.listen(3333)