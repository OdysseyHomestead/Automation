from typing import Any

# Adapter for MongoDB access (tech details).
# In real implementation, inject this into app-layer services via ports/interfaces.


class MongoRepository:
    def __init__(self, uri: str) -> None:
        self._uri = uri

    async def ping(self) -> dict[str, Any]:
        # Placeholder: avoid pulling heavy drivers in minimal stub
        return {"ok": 1, "uri": self._uri}
