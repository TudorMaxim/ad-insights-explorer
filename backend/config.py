import os

import dotenv

dotenv.load_dotenv()


class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", default="development")
    POSTS_URL = os.getenv("POSTS_URL")
    POST_CACHE_EXPIRY_DURATION = int(
        os.getenv("POST_CACHE_EXPIRY_DURATION", default="600")
    )
    POSTS_DEFAULT_PAGE_SIZE = int(os.getenv("POSTS_DEFAULT_PAGE_SIZE", default="10"))
    POSTS_MIN_TITLE_LENGTH = int(os.getenv("POSTS_MIN_TITLE_LENGTH", default="15"))
    USER_POSTS_SIMILAR_TITLE_THRESHOLD = int(
        os.getenv("USER_POSTS_SIMILAR_TITLE_THRESHOLD", default="5")
    )


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


config = DevelopmentConfig if Config.FLASK_ENV == "development" else ProductionConfig
