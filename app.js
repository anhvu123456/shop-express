require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');
var path = require('path');

// set up mongoose
mongoose.connect("mongodb://localhost:27017/shop-express", { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('Database connected');
   })
   .catch((error)=> {
     console.log('Error connecting to database');
});

var userRoute = require('./routes/user.routes');
var productRoute = require('./routes/product.routes');
var authRoute = require('./routes/auth.routes');

var port = 3000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public/'));

app.use("/users/api", userRoute);
app.use("/products/api", productRoute);
app.use("/auth/api", authRoute);

app.listen(port, function(){
    console.log('Server listening on port ' + port);
})
