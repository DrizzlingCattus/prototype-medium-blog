const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');

const db = require('../db.json');
console.log('db work well?', db);

const router = express.Router();

router.route('/medi').get((req, res) => {
    res.redirect('/dist/medi.html');
});

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use('/medi', router);

// save post
server.post('/medi/post', (req, res) => {
    const newPost = {
        id: db.prevId + 1,
        name: req.body.postName,
        html: req.body.postHtml,
    };
    db.prevId += 1;
    db.post.push(newPost);
    fs.writeFileSync('../db.json', JSON.stringify(db));
    fs.writeFileSync(newPost.name, newPost.html);
});

// pass target post
server.get('/medi/post/:id', (req, res) => {
    let target = {};
    db.post.map((p) => {
        if (p.id === req.params.id) {
            target = p;
        }
    });
    res.json(target);
});


const binding = server.listen(9001);
