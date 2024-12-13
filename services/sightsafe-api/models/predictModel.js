const { v4: uuidv4 } = require("uuid");

const { sendQueue, requestQueue } = require("../helpers/queue");
const { db } = require("../db");

const predictEyeDisease = async (buffer) => {
  const base64Image = buffer.toString("base64");

  const id = uuidv4();

  response = JSON.parse(
    await requestQueue({ id, type: "classify", data: base64Image })
  );

  // Simulated Model Logic (Replace with actual model integration)
  return {
    id,
    ...response,
  };
};

module.exports = { predictEyeDisease };
