#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ),
  message TEXT,
  date TIMESTAMP 
);

INSERT INTO messages (name, message, date) 
VALUES ('Amando', 'Hi there', NOW());

INSERT INTO messages (name, message, date) 
VALUES ('Charles', 'Hello World!', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`,
    ssl: {
      rejectUnauthorized: false,
    }
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
