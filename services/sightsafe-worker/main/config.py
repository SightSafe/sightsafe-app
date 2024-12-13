from typing import Union

import os, logging


class BaseConfig:
    AMQP_URI = os.environ["AMQP_URI"]

    MODEL_PATH = "./fixtures/SightSafe-EyeDisease.h5"

    # Define class names based on your dataset
    CLASS_NAMES = [
        "Bitot_Spot_of_Vitamin_A_Deficiency",
        "Cataracts",
        "Cellulitis_eye",
        "Conjunctivitis",
        "Corneal_Ulcer",
        "Ectropion",
        "Normal_Eye",
    ]


class DevelopmentConfig(BaseConfig):
    LOG_LEVEL = logging.DEBUG


class StagingConfig(BaseConfig):
    LOG_LEVEL = logging.WARNING


class ProductionConfig(BaseConfig):
    LOG_LEVEL = logging.WARNING


environ = {
    "dev": DevelopmentConfig,
    "staging": StagingConfig,
    "prod": ProductionConfig,
}

current_env: Union[DevelopmentConfig, StagingConfig, ProductionConfig] = environ[
    os.environ.get("ENV", "dev")
]
