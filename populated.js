#! /usr/bin/env node
const Message = require("./models/message");

console.log(
    'This script populates some messages to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function messageCreate(index, name, messageContent) {
  const message = new Message({ name: name, message: messageContent });
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${message}`);
}


async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(0, "Amando", "Hi there!"),
    messageCreate(1, "Charles", "Hello World!")
  ]);
}