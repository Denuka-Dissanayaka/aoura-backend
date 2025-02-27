const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const SequelizeStore = require("connect-session-sequelize");
//import FileUpload from "express-fileupload";
const FileUpload = require("express-fileupload");
const db = require("./config/Database");

const ProductRoutes = require("./routes/ProductRoute");
const UserRoutes = require("./routes/UserRoute");
const AuthRoutes = require("./routes/AuthRoute");
const NetworkRoutes = require("./routes/NetworkRoute");
const StaffRoutes = require("./routes/StaffRoute");
const CustomerRoutes = require("./routes/CustomersRoute");
const OrderRoutes = require("./routes/OrderRoute");
const ExpenseRoutes = require("./routes/ExpenseRoute");
const CashbookRoute = require("./routes/CashbookRoute");
const SupplierRoute = require("./routes/SupplierRoute");
const IngredientRoute = require("./routes/IngredientRoute");

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://aoura-demo.netlify.app",
    //origin: "http://localhost:5173",
    //methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: true,
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
app.use("/api/v1", CustomerRoutes);
app.use("/api/v1", OrderRoutes);
app.use("/api/v1", ExpenseRoutes);
app.use("/api/v1", CashbookRoute);
app.use("/api/v1", SupplierRoute);
app.use("/api/v1", IngredientRoute);

//store.sync();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started at port ${port}`));
