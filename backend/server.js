const express = require("express");
const dbConnect = require("./database/index");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = 3000;

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3001", "http://10.0.2.2:8081"], // Allow both localhost and emulator
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

app.use(router);

dbConnect();

app.use("/storage", express.static("storage"));
app.use('/storage', express.static('D:\\tailortwo\\backend\\storage'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Backend is running on port: ${PORT}`));
