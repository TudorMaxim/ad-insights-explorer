import os
import dotenv

dotenv.load_dotenv()

class Config:
    FLASK_ENV = os.getenv("FLASK_ENV", default="development")
    POSTS_URL = os.getenv("POSTS_URL")
    POSTS_DEFAULT_PAGE_SIZE = int(os.getenv("POSTS_DEFAULT_PAGE_SIZE", default="10"))


class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = DevelopmentConfig if Config.FLASK_ENV == "development" else ProductionConfig
