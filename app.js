const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type RootQuery {
        events: [Event!]!
    }   
    
    type RootMutation {
        createEvent(eventInput: EventInput): Event
    } 

    schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
            });

            return event
                .save()
                .then((res) => {
                    console.log(res);
                    console.log(res._doc);
                    return { ...res._doc };
                })
                .catch((err) => {
                    console.log(err);
                    throw err;
                });
        }
    },
    graphiql: true
}));

mongoose.connect(process.env.database, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log('Database error ' + err);
    });
