const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const items = require('./routes/api/items');
const users = require('./routes/api/users');

const app = express();


require('./config/passport');
//Middleware

app.use(bodyParser.json());






// DB Config
const db = require('./config/keys').mongoItems;
const userDb = require('./config/keys').mongoUsers;


// Connect to Mongo
mongoose
  .connect(userDb)
  .then(() => console.log('Userdatabase Connected....'))
  .catch(err => console.log(err));
// mongoose
//   .connect(db)
//   .then(() => console.log('Itemsdatabase Connected...'))
//   .catch(err => console.log(err));


// // Use Routes

// app.use('/api/items', items);
app.use('/api/users', users);





// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//passport



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));