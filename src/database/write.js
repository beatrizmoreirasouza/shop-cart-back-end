import fs from "fs";
import path from "path";

function writeDatabase(file, data) {
  fs.writeFileSync(path.resolve(__dirname, file), JSON.stringify(data));
}

export default writeDatabase;
