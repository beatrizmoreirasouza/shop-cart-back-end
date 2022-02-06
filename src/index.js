import express, { response } from "express";
import { v4 as uuid } from "uuid";
import userList from "./database/users.json";
import writeDatabase from "./database/write";

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());

server.get("/", (request, response) => {
  response.send("Hello Beautiful World!");
});

let list = userList;

server.get("/users", (request, response) => {
  response.json(list);
});

server.post("/users", (request, response) => {
  const user = {
    id: uuid(),
    ...request.body,
  };
  list.push(user);
  writeDatabase("users.json", list);
  response.send(user);
});

server.get("/users/:id", (request, response) => {
  const { id } = request.params;
  response.json(list.find((item) => item.id === id));
});

server.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, email, phone } = request.body;
  const user = {
    id,
    name,
    email,
    phone,
  };
  list = list.map((item) => {
    if (item.id === id) {
      return user;
    }
    return item;
  });
  writeDatabase("users.json", list);
  response.json(user);
});

server.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const index = list.findIndex((item) => item.id === id);
  if (index !== undefined) {
    list.splice(index, 1);
  }
  writeDatabase("users.json", list);
  response.json({ message: "Ok" });
});

server.listen(PORT, () => console.log(`Running... http://localhost:${PORT}`));
