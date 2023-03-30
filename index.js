const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/route.users");
const client = require("./utils/db");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
client.connect();

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Ok");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
