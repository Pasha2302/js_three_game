from pydantic import BaseSettings

class Settings(BaseSettings):
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 8000

    class Config:
        env_prefix = "APP_"
