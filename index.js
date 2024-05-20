const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notfound, errorHandler } = require('./middlewares/errorHandler');
const questionsRoute = require('./routes/questionsRoute');
const answerRoutes = require('./routes/answerRoute');
const app = express();
const dotenv=require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes=require('./routes/authroutes');
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000;
dbConnect()
// app.get('/', (req, res) => {
//   res.send('Hi dhiwagar');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use('/api/users', authRoutes);

app.use('/api', questionsRoute);
app.use('/api', answerRoutes);
app.use(notfound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Hey! dhiwagar Server is running on http://localhost:${PORT}`);
});
