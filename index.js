const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize");

const db = require("./config/Database");

const ProductRoutes = require("./routes/ProductRoute");
const UserRoutes = require("./routes/UserRoute");
const AuthRoutes = require("./routes/AuthRoute");
const NetworkRoutes = require("./routes/NetworkRoute");
const StaffRoutes = require("./routes/StaffRoute");

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["https://aoura-demo.netlify.app"],
    //methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
      sameSite: "None",
      //maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api/v1", ProductRoutes);
app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", NetworkRoutes);
app.use("/api/v1", StaffRoutes);

//store.sync();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));
