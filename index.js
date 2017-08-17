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
    user: "will",
    pw: "clever"
  }
];


app.get('/login', (req, res) => {
  res.render('login');                  //renders login page
});

app.get('/', (req, res) => {
  // res.render('index');           //upon loading index redirects to login page
  res.redirect('login');                //needs if statement to check for session login?
});

app.post('/checkInfo', (req, res) =>{     //checks entered username and password against "loginInfo"
  let username = req.body.username;
  let password = req.body.password;
  loginInfo.forEach((item, index) =>{
    if(req.body.username === loginInfo[index].user && req.body.password === loginInfo[index].pw){
      res.redirect('index');
    } else {
      res.redirect('login');
    }
  });
  // console.log(username);
  // console.log(password);



});


app.listen(3000);
