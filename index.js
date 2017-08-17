const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));

const loginInfo = [
  {
    username: "user",
    password: "clever"
  }
];


app.get('/login', (req, res) => {
  res.render('login');                  //renders login page
});

app.get('/', (req, res) => {
  // res.render('index');           //upon loading index redirects to login page
  res.redirect('login');                //needs if statement to check for session login?
});

app.post('/checkInfo', (req, res) =>{
  let username = req.body.username;
  let password = req.body.password;
  loginInfo.forEach((item, index) =>{
    if(req.body.enter === )
  });
  console.log(username);
  console.log(password);

  //checks entered username and password against "loginInfo" username & password

});


app.listen(3000);
