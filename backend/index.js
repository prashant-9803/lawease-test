const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const { Server } = require("socket.io");
const messageRoutes = require("./routes/Message")

const PORT = process.env.PORT || 4000;



// db connection
database.connect();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const server = app.listen(PORT, (req,res) => {
    console.log(`App is running at ${PORT}`)
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

global.onlineUsers = new Map();


// //cloudinary connection
cloudinaryConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","https://accounts.google.com",
      "https://oauth2.googleapis.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// these security headers
app.use((req, res, next) => {
  res.header('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.header('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});


//import routes
const userRoutes = require("./routes/User")
const caseRoutes = require("./routes/Case")
const profileRoutes = require("./routes/Profile")

//routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/case", caseRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/message", messageRoutes)


//default route
app.get("/", (req,res) => {
    res.send("<h1>This is Homepage</h1>")
})

app.get("/contact", (req,res) => {
    res.send("<h1>This is contact page</h1>")
})

io.on("connection", (socket) => {
  global.chatSocket = socket;
  console.log("A user connected ", socket.id);


})