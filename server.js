const express = require('express')
const app = express()
const fs = require('fs-extra')
const cors = require('cors')


app.use(cors({
    origin: 'https://cuongtwt.github.io/Client/',
}))
app.use(express.json());
app.get('/', (req, res) => {
    fs.readFile('./server.json', 'utf8', (e, data) => {
        res.send(data)

    })

})


app.post('/post', (req, res) => {


    fs.readFile('./server.json', 'utf8', (e, data) => {
        let json = JSON.parse(data)
        const fill = json.filter(item => item.item === req.body.item)
        if (fill.length === 0) {
            json.push({ item: req.body.item })
            fs.writeFile('./server.json', JSON.stringify(json), err => {
                console.log(data)
            })
        } else {
            res.send(json)
            console.log('tài khoản đã tồn tại')
        }





    })

})
app.listen(3000, () => { console.log('server listening on port') })