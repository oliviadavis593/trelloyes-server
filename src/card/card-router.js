const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const { cards, lists } = require('../store')
const cardRouter = express.Router()
const bodyParser = express.json()



cardRouter
    .route('/card')
    //getting full list of cards
    .get((req, res) => {
        res
      .json(cards);
    })
    .post(bodyParser, (req, res) => {
        //POST request: Getting the data from the body
    const { title, content } = req.body;

        // validation that both title & content exist 
    if (!title) {
    logger.error(`Title is required`)
    return res 
        .status(404)
        .send('Invalid data');
    }

    if (!content) {
    logger.error(`Content is required`)
    return res
        .status(404)
        .send('Invalid data')
    }

        //get an id 
    const id = uuid();

    const card = {
        id, 
        title, 
        content 
    }
    cards.push(card);

    //if they do exist => log card create & send response inclu. location header
    logger.info(`Card with id ${id} created`);
    res 
        .status(201)
        .location(`http://localhost:8000/card/${id}`)
        .json(card);
    })
    
cardRouter
    .route('.card')
    //Gives us the ability to get an individual card by ID
    //GET /card/:id => retrieves a card by ID
    .get((req, res) => {
        const { id } = req.params; 
        const card = cards.find(c => c.id == id);

        //make sure we found a card
        if (!card) {
            logger.error(`Card with id ${id} not found`)
            return res
                .status(404)
                .send('Card not found')
        }

        res.json(card);
    })
    //Cards have a reference for lists 
    //Removing card ID from those lists 
    //Otherwise we'd end up w. lists reffering to cards that don't exist 
    .delete((req, res) => {
        const { id } = req.body; 

        const cardIndex = cards.findIndex(c => c.id == id);

        if (cardIndex === -1) {
            logger.error(`Card with id ${id} not found`);
            return res  
                .status(404)
                .send('Not found')
        }

        //remove card from lists 
        //assume cardIds aren't duplicated in the cardIds array 
        lists.forEach(list => {
            const cardIds = list.cardIds.filter(cid => cid !== id);
            list.cardIds = cardIds; 
        })
        cards.splice(cardIndex, 1);

        loggerInfo(`Card with id ${id} deleted`)

        res
            .status(204)
            .end();
    })

module.exports = cardRouter