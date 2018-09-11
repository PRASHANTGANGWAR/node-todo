let mongoose = require('mongoose')
var url = "mongodb://127.0.0.1:27017/todo-db";
var connection = mongoose.connection;
connection.on('connected', function()
{
    console.log("connected");
})


// mongoose.connection.openUri(config.mongourl);   // New Syntax
//var db = mongoose.connection;
// //handle mongo error
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
// console.log('connected to modb') // we're connected!
// });
mongoose.connect(url);

let taskSchema = new mongoose.Schema({

  id: {type:Number}, 
  taskname: { type: String  },
  description :{ type:String},
  created_date :(Date),
  updated_date :(Date),
  priority : {type:Number}

})

module.exports = mongoose.model('tasks', taskSchema)
