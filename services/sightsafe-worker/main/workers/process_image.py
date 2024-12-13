from kombu import Message, Connection
from pydantic import ValidationError
import numpy as np, json

from main.models.classifier import ClassifyRequest
from main.lib.nn import preprocess_binary_image
from main.config import current_env as config

import main.context as context


def process_image(body: str, message: Message):
    try:
        validated_body = ClassifyRequest.model_validate(json.loads(body))

        preprocessed_image = preprocess_binary_image(validated_body.data, 224, 224)

        predictions = context.model.predict(preprocessed_image)
        predicted_class_index = np.argmax(predictions[0])
        confidence = np.max(predictions[0])

        payload = {
            "id": validated_body.id,
            "predicted_class": config.CLASS_NAMES[predicted_class_index],
            "confidence": float(confidence),
        }

        print(payload)

        with Connection(config.AMQP_URI) as conn:
            with conn.SimpleQueue(
                validated_body.id, queue_opts={"durable": False}
            ) as q:
                q.put(payload)

        message.ack()
    except ValidationError as e:
        print(e)
        message.reject()
