from kombu import Connection

from main.workers.process_image import process_image
from main.config import current_env as config

import main.context as context


with Connection(config.AMQP_URI) as conn:
    with conn.Consumer(
        context.classifier_queue, callbacks=[process_image], accept=["json"]
    ) as consumer:
        # Process messages and handle events on all channels
        while True:
            conn.drain_events()
