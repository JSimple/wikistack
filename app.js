const express = require("express");
const morgan = require("morgan");
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

const app = express();

const layout = require("./views/layout");
const { db, Page, User } = require('./models');


app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get("/", (req, res) => {
    console.log("Hello world")
    res.send(layout(" "));
})

db.authenticate().then(() => {
    console.log('connected to the database');
  })

const init = async () => {
    await Page.sync();
    await User.sync();
    await db.sync({force: true})
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
  }

init();

const PORT = 3000;

