import redis


class RedisClient:
    def __init__(self, url: str) -> None:
        self._client = redis.Redis.from_url(url)

    def ping(self) -> bool:
        try:
            return bool(self._client.ping())
        except Exception:
            return False

