var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use('/', express.static('build'));

var todos = [
  {
    id: '0',
    title: 'Do laundry',
    completed: false
  },
  {
    id: '1',
    title: 'Get groceries',
    completed: false
  },
  {
    id: '2',
    title: 'Study JavaScript',
    completed: false
  }
]

var todoIndex = 3;


app.get('/api/all', function(req, res) {
  res.json({todos: todos})
});

app.post('/api/all', jsonParser, function(req, res) {
  if (!('title' in req.body)) {
    return res.sendStatus(400);
  }

  todos.push({id: todoIndex, title: req.body.title, completed: req.body.completed});
  todoIndex++;
  res.status(201).json({todos: todos})
});

app.put('/api/:id', jsonParser, function(req, res) {
  console.log(req.body)
  console.log(!('title' in req.body));
  console.log(!('status' in req.body));

  if (!('title' in req.body ) && !('status' in req.body)) {
    return res.sendStatus(400);
  }

  if (req.body.title) {
    todos[req.params.id].title = req.body.title
  };

  if (req.body.status) {
    todos[req.params.id].completed = req.body.status
  };
  res.status(201).json({todos: todos})
});

app.listen(3000, function () {
  console.log('Listening at 3000!');
});
