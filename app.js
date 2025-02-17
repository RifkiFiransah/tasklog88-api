import express from "express";

const app = express();
const port = 3090;


const init = async () => {
  try {
    app.get("/", (req, res) => {
      res.send("Hello World!");
      console.log("Response sent");
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

init()