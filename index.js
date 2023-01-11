const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
var cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));
const PORT = process.env.PORT;

// Routes
const AuthRoute = require("./routes/Auth");
const PostsRoute = require("./routes/Posts");
const UserRoute = require("./routes/User");

// For body json
app.use(express.json());
// Endpoints
app.use("/auth", AuthRoute);
app.use("/posts", PostsRoute);
app.use("/user", UserRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
