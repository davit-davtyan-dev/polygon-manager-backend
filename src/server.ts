import app from "./app";
import { connect as connectMongoose } from "./mongoose";
import { PORT } from "./constants";

connectMongoose();

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
