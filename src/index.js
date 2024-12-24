const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.use(cors());
app.use(bodyParser.json());

routes(app);

mongoose.connect(`mongodb+srv://luanle114:${process.env.MONGO_DB_PASSWORD}@cluster0.5mob6qe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log(error);
});

app.listen(port, () => {
  console.log('Server is running on port' + port);
});