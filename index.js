const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const parseurl = require('parseurl');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));
app.use(session({
  secret: 'yay',
  resave: false,
  saveUnitialized: true
}));

const loginInfo = [
  {
    user: "will",
    pw: "clever"
  }
];



app.use((req, res, next) => {
  let pathname = parseurl(req).pathname;
  if (!req.session.loggedIn && pathname != '/login'){
    res.redirect('login');
  } else {
  next();
  }
});


app.get('/login', (req, res) => {
  res.render('login');                  //renders login page
});

app.get('/', (req, res) => {
  res.render('index', {username: req.session.user});    //displays the session username on main page
});

app.post('/login', (req, res) => {     //checks entered username and password against "loginInfo"
  let username = req.body.username;
  let password = req.body.password;
  console.log('here');
  // loginInfo.forEach((item, index) =>{
  for (var i = 0; i < loginInfo.length; i++) {
    let login = loginInfo[i];
    console.log('login', login);
    if(login.user === req.body.username && login.pw === req.body.password){
      console.log('here i am');
      req.session.loggedIn = true;
      req.session.user = req.body.username;
    }
  }
  res.redirect('/');

  });
  // console.log(username);
  // console.log(password);






app.listen(3000);
