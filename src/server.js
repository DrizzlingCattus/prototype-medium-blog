const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../db.json');
console.log('db work well?', db);

const router = express.Router();

router.route('/').get((req, res) => {
    console.log('hello start session');
    console.log('dir', __dirname);
    const resolvedMedi = path.resolve('dist/medi.html');
    console.log('resolved', resolvedMedi);
    res.sendFile(resolvedMedi);
    //res.redirect('../dist/medi.html');
});

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(cors());

server.use('/', router);

// save post
server.post('/medi/post', (req, res) => {
    const newPost = {
        id: db.prevId + 1,
        name: req.body.postName || 'default_name',
        html: req.body.postHtml || '<p>default_html</p>',
    };
    db.prevId += 1;
    db.post.push(newPost);
    console.log('saved db', db);
    console.log('new post', newPost);
    fs.writeFileSync('db.json', JSON.stringify(db));
    fs.writeFileSync('post/' + newPost.name, newPost.html);
});

// pass target post
server.get('/medi/post/:id', (req, res) => {
    let target = {};
    const reqId = req.params.id - 0;
    db.post.map((p) => {
        if (p.id == reqId) {
            target = p;
        }
    });
    res.json(target);
});


const binding = server.listen(process.argv[2] - 0);
