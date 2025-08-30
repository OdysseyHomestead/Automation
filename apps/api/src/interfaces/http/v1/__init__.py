import os
from fastapi import APIRouter

router = APIRouter()


@router.get("/version")
def version() -> dict[str, str]:
    return {"version": os.getenv("APP_VERSION", "0.1.0")}

