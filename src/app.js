import express from 'express';
import 'dotenv';
import cors from 'cors';
import formData from 'express-form-data';
import http from 'http';
import routes from './routes/index';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: '*'
  })
);

// app.use(session({
//     secret: 'your-secret-key',
//     resave: true,
//     saveUninitialized: true,
// }));

// app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

// app.use(passport.initialize());
// app.use(passport.session());
app.use('/api', routes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the app.' });
});

app.get('*', (req, res) => {
  res.status(404).json({ message: 'Route not found!' });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log('server up running on port ', port);
});

export default server;
