    let mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/myapp');
    var bodyParser = require('body-parser'); 
    var express = require('express');
    var app = express();
    var router = express.Router();
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.use(express.static('./'));
    var router = express.Router();
    app.use('/api', router);
    app.get('/', function (req, res) {
        res.send("hello");
    });
    var taskSchema = require('./src/db')

    app.get('/loadall', (req, res) => {
        //  return res.send('hello world')
        dbo.collection("tasks").find({}).toArray(function (err, result) {
            if (err) throw err;
            return res.send(result);
            db.close();
        });
    })
    // app.get('/findone/:id', (req, res) => {
    //     var id = req.params.id;
    //     id = parseInt(id);
    //     dbo.collection("tasks").findOne({ 'id': id }).toArray(function (err, result) {
    //         console.log("check err and res", err, JSON.stringify(result));
    //         if (err) throw err;
    //         return res.send(result);
    //         db.close();
    //     })
    // });


    app.get('/findone/:id', (req, res) => {
        var id = req.params.id;
        //id = parseInt(id);
            id = toString(id);
    taskSchema
        .find({
            'id':  id  // search query
        })
        .then(doc => {
            console.log(doc)
            res.send({'message':doc}) 

        })
        .catch(err => {
            console.error(err)
            res.send({'message':doc}) 

        })

    });

    app.get('/delete/:id', (req, res) => {
        var id = req.params.id;

        // id= id.toString;
        id = parseInt(id);
        dbo.collection("tasks").delete({ 'id': id }).toArray(function (err, result) {
            console.log("check err and res", err, JSON.stringify(result));
            if (err) throw err;
            return res.send(result);
            db.close();
        })
    });

    var msg
    var count = 1;
    app.post('/tasks', urlencodedParser, function (req, res) {
        if (!req.body) return res.sendStatus(400)
        myobj = req.body
        req.body.id = count;
        req.body.created_date = new Date()
        req.body.updated_date = new Date()

        msg = new taskSchema(myobj)
            msg.save()
            .then(doc => {
            console.log(doc)
            res.send({'message':doc}) 
            })
            .catch(err => {
            console.error(err)
            })
            count++;
        });
            
        

    var todocontroller = require('./controllers/todo-controller');
    todocontroller(app);

    //application running at 8080
    app.listen(8080, () => {
        console.log("listining on port 8080");
    })

    // rendering ejs page  or getting data from api
    app.get('/test', function (req, res) {
        res.render('todo.ejs', { root: __dirname, abc: "test1", hello: "hello" })
    });
