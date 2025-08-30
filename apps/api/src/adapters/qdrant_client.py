class QdrantClientAdapter:
    def __init__(self, url: str) -> None:
        self._url = url

    async def ping(self) -> dict[str, str]:
        return {"url": self._url, "status": "stub"}

