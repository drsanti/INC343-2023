import express  from 'express';
import cors from 'cors';
import path from 'path';
const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3300;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`\nOpen a web browser and go to http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
});


/**
 * Static file
 */
app.get('/', function (req, res, next) {
    res.sendFile(path.join(path.resolve(), '/ex06_page.html'));
});


/**
 * Using `req.params` with Routes (one parameter)
 * 
 * http://127.0.0.1:3300/target/2
 */
app.get('/target/:id', function (req, res, next) {

    const id = eq.params.id;
    console.log(id);
    res.json({cmd: `target`, id: id})
});

/**
 * 
 * Using`req.params` with Routes (multiple parameter)
 * 
 * http://127.0.0.1:3300/target/2/on
 * `2` is id
 * `on` is action
 */
app.get('/target/:id/:action', function (req, res, next) {
    res.json({
        "target": "target",
        "id": req.params.id,
        "action": req.params.action
    })
});


/**
 *  Using`req.query` with URL Parameters
 * 
 * http://127.0.0.1:3300/target?id=2&action=on
 */
app.get('/target', function (req, res, next) {
    console.log(req.query);
    res.json({
        "target": "target",
        "id": req.query.id,
        "action": req.query.action
    })
});



