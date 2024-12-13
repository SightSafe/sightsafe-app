from kombu import Exchange, Queue

from main.config import current_env as config
from main.lib.nn import load_model


main_exchange = Exchange("main", "direct", durable=True)

classifier_queue = Queue("classifier", exchange=main_exchange, routing_key="classifier")
server_queue = Queue("server", exchange=main_exchange, routing_key="server")

model = load_model(config.MODEL_PATH)
