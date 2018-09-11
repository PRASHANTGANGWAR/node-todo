//packages  needed
var bodyParser = require('body-parser'); // for taking input
var express = require('express');
var app = express();
//var mongo = require("mongo");
var router = express.Router();
//app.set('view engine','ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('./'));
var router = express.Router(); // for routing 
app.use('/api', router);
app.get('/', function (req, res) {
    res.send("hello");
});

app.get('/loadall', (req, res) => {
    //  return res.send('hello world')
    dbo.collection("tasks").find({}).toArray(function (err, result) {
        if (err) throw err;
        return res.send(result);
        db.close();
    });
})

//pp
//  app.get('/loadall',async(req,res)=>{
//     //  return res.send('hello world')
//     dbo.collection("tasks").find({}).toArray((err, result) => {
//         if (err) throw err;
//        return res.send(result);
//         db.close();
//       });
//  })
//  var o_id = new mongo.ObjectID(theidID);

app.get('/findone/:id', (req, res) => {
    var id = req.params.id;

    // id= id.toString;
    id = parseInt(id);
    dbo.collection("tasks").findOne({ 'id': id }).toArray(function (err, result) {
        console.log("check err and res", err, JSON.stringify(result));
        if (err) throw err;
        return res.send(result);
        db.close();
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



var count = 1;
app.post('/tasks', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)
    myobj = req.body
    req.body.id = count;
    req.body.created_date = new Date()
    req.body.updated_date = new Date()
    dbo.collection("tasks").insertOne(myobj, function (err, resp) {
        if (err) throw err;
        console.log("1 document inserted", resp);
        res.send('welcome, ' + req.body.taskname)
    });
    count++;
})

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

//connecting to database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/todo-db";
var dbo
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("todo-db"); //db todo-db created
    console.log("Database created!" + dbo);

    // table created tasks
    dbo.createCollection("tasks", function (err, res) {
        if (err) throw err;
        console.log("Collection created! tasks");
    });


});