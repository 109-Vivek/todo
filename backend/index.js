const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
const userRoute = require("./routes/user");
const { PORT } = require("./config");
app.use("/user", userRoute);

app.listen(PORT, (req, res) => {
  console.log(`App running on port ${PORT}`);
});
