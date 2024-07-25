const pool = require("./pool");

function formatDateForSQL(date) {
  const pad = (num) => (num < 10 ? '0' : '') + num;
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

async function getAllMessages() {
  try {
    const { rows } = await pool.query("SELECT name, message, date FROM messages");
    return rows;
  } catch (error) {
    console.error("Error retrieving messages:", error);
    throw error;
  }
}

async function addMessage(name, message) {
  const date = new Date();
  try {
    await pool.query("INSERT INTO messages (name, message, date) VALUES ($1, $2, $3)", [name, message, formatDateForSQL(date)]);
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
}

module.exports = {
  getAllMessages,
  addMessage
};
