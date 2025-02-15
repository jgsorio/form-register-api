import "express-async-errors";
import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
