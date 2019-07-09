const express = require('express');
const methodOverride = require('method-override');
const db = require('./models');


const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.render('index');
});

// GET /widgets - gets all widgets
app.get('/widgets', function(req, res) {
  db.widget.findAll()
    .then(function(widgets) {
      res.render('widgets/index', {widgets});
  });
});

// POST /widgets - add new widget
app.post('/widgets', function(req, res) {
  let newWidget = {
    description: req.body.description,
    quantity: parseInt(req.body.quantity)
  }
  db.widget.create(newWidget).then(function(widget) {
    res.redirect('/widgets');
  });
});

// DELETE /widgets/:id - delete widget
app.delete('/widgets/:id', function(req, res) {
  db.widget.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(response) {
    res.redirect('/widgets');
  });
});

app.listen(3000, function() {
  console.log("🐡🐡🐡 listening...");
});
