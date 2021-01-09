const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { Router } = require('express');
const websocket = require('./websocket/websocket.js');
const User = require('./User.js');

const PORT = 4300;
const app = express();
const router = Router();

ejs.delimiter = '?';

queueMicrotask(() => {
    console.log('hmm')
})

//app.use(client);
app.use(express.static(path.join(__dirname, '/../public')));
app.set('views', path.join(__dirname, '/../public/'));
app.set('view engine', 'ejs');
//app.engine('html', ejs.renderFile);

app.use(express.urlencoded({ extended: true }));
app.use(router);

async function run() {
    try {
        await mongoose.connect('mongodb+srv://andry:adminADMIN@chat.dbuht.mongodb.net/chat', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        websocket();
        app.listen(PORT, () => {
            console.log('server running');
        });
    } catch (error) {
        console.log('server run fault:' + error);
    }
}

run();

router.get('/', (req, res) => {
    res.render('login.ejs');
});

router.get('/chat', (req, res) => {
    const user = [];
    res.render('chat.ejs', { model: 'anysyka' });
});

router.post('/login', async (req, res) => {
    await new User({ name: req.body.name }).save();
    res.redirect('/chat');
});
