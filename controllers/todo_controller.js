var bodyParser = require('body-parser');
var urlencoded = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://test:test123@ds157946.mlab.com:57946/todo_app');

var todoschema = new mongoose.Schema({
    item: String 
});

var Todo = mongoose.model('Todo', todoschema);

//var data = [{item: "get milk"}, {item: " walk dog"}, {item:"kick ass"}];

module.exports = function(app){

app.get('/todo', function(req, res){
    Todo.find({},function(err,data){
        if (err) throw err;
        res.render('todo', {todos:data});
    });
});

app.post('/todo', urlencoded, function(req, res){
    var newtodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req, res){
    Todo.find({item:req.params.item.replace(/\-/g,' ')}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

};