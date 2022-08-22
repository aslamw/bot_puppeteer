const data = require('../data_computer.json')
const express = require('express')

const app = express()
app.use(express.json())

//rota para ver todos dados ou filtrar por nome
app.get('/',(req, res)=>{
    
    //ver se tem conteudo no name
    if(req.query.name){
        //console.log(data[req.query.name])
        const resul = []
        const filter_name = req.query.name

        //pegando pelo nome escolhido
        for(const item of data){
            const name = Object.keys(item)
            if(item[name][1][0] === filter_name){
                resul.push(item)
            }
        }
        
    
        res.json(resul)
    }

    res.json(data)
    }
)


app.listen(3333)