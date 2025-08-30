from fastapi import FastAPI
from .interfaces.http.health import router as health_router
from .interfaces.http.v1 import router as v1_router


def create_app() -> FastAPI:
    app = FastAPI(title="Automation API", version="0.1.0")
    app.include_router(health_router)
    app.include_router(v1_router, prefix="/v1")
    return app


app = create_app()

