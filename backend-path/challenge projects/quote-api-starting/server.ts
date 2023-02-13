const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

const quotesRouter = express.Router()

app.use('/api', quotesRouter)

quotesRouter.get('/quotes/random', (req: any, res: any, next: any) => {
    const randomQuote: object = getRandomElement(quotes)
    res.send({quote:randomQuote})
})

quotesRouter.get('/quotes', (req: any, res: any, next: any) => {

    if (Object.entries(req.query).length != 0 ) {
        const author = req.query
        const authorQuotes : typeof quotes = []

        quotes.forEach(function (element: typeof quotes) {
            if (author.person === element.person) {
                authorQuotes.push(element)
            }

        });
        res.send({quotes:authorQuotes})
    } else {
        res.send({quotes:quotes})
    }

})

quotesRouter.post('/quotes', (req: any, res: any, next : any) => {

    if(req.query.quote && req.query.person){
        quotes.push(req.query)
        res.status(201).send({quotes:quotes})

    } else {
        res.status(400).send()
    }

})

app.use(express.static('public'));
app.listen(PORT), console.log(`Servidor abierto en el ${PORT}`)

