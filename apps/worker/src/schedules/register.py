from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.interval import IntervalTrigger
from ..jobs.heartbeat import heartbeat
import os


def run_scheduler() -> None:
    scheduler = BlockingScheduler(timezone="UTC")
    redis_url = os.getenv("REDIS_URL", "redis://redis:6379")
    scheduler.add_job(heartbeat, IntervalTrigger(minutes=1), args=[redis_url], id="heartbeat")
    scheduler.start()

