import tensorflow as tf
import base64


def load_model(path):
    return tf.keras.models.load_model(path)


# Image preprocessing function
def preprocess_binary_image(image_b64: str, target_height: int, target_width: int):
    image_binary = base64.b64decode(image_b64)

    # Decode the binary image
    image = tf.io.decode_image(image_binary, channels=3, expand_animations=False)

    # Convert the image to float32 (if not already) and normalize to [0, 1]
    image = tf.image.convert_image_dtype(image, dtype=tf.float32)

    # Resize the image to the target size
    image = tf.image.resize(image, [target_height, target_width])

    image = tf.expand_dims(image, axis=0)

    return image
