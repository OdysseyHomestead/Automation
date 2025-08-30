from datetime import datetime, timezone
from ..adapters.redis_client import RedisClient


def heartbeat(url: str) -> None:
    client = RedisClient(url)
    ok = client.ping()
    now = datetime.now(timezone.utc).isoformat()
    status = "ok" if ok else "down"
    print(f"[worker] heartbeat {now} redis={status}")

