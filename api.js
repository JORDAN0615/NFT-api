const dboperations = require('./dboperations');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { query } = require('express');
const { request } = require('express');
const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api',router)

router.use((req,res,next) =>{
    console.log('middleware')
    next();
})

router.route('/fruitlists').get((req,res) => {
    dboperations.getFruitListResult(req.query).then(result => {
        console.log(result);
        res.json(result);
    })
    }
)   

router.route('/fruitlists/:id').get((req, res) => {
    dboperations.getFruitListResultFromId(req.params.id).then(result => {
        res.json(result);
        console.log(result)
    })
})

router.route('/fruitlists').post((req, res) => {
    dboperations.addFruitItem(req.body).then(result => {
        console.log(req.body);
        res.send('created successfully')
    })
})


router.route('/fruitlists/:id').delete((req, res) => {
    dboperations.deleteFruit(req.params.id).then(result => {
        console.log(req.params.id)
        res.send('Deleted successfully')
    })
})

const port = process.env.PORT || 8090;
app.listen(port)
console.log('fruitlists API is running at ' + port)

