const amqp = require("amqplib"); // Import library amqp

const sendQueue = async ({ id, type, data }) => {
  conn = await amqp.connect(process.env.AMQP_URI);

  ch = await conn.createChannel();

  const payload = { id, type, data };

  ch.assertExchange("main", "direct", {
    durable: true,
  });

  ch.publish("main", "classifier", Buffer.from(JSON.stringify(payload)));

  await ch.close();

  await conn.close();
};

const requestQueue = ({ id, type, data }) => {
  return new Promise(async (resolve, reject) => {
    const payload = { id, type, data };
    let done = false;

    conn = await amqp.connect(process.env.AMQP_URI);
    ch = await conn.createChannel();

    ch.assertExchange("main", "direct", {
      durable: true,
    });

    ch.assertQueue(id, { durable: false });

    ch.consume(id, async (msg) => {
      if (msg) {
        console.log("- Received", msg.content.toString());

        done = true;
        await ch.ack(msg);
        await ch.close();
        await conn.close();

        resolve(msg.content);
      }
    });

    ch.publish("main", "classifier", Buffer.from(JSON.stringify(payload)));

    setTimeout(async () => {
      if (!done) {
        await ch.close();
        await conn.close();

        reject("Timeout");
      }
    }, 3000);
  });
};

module.exports = { sendQueue, requestQueue };
