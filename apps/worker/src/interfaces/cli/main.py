import click
from ...schedules.register import run_scheduler


@click.group()
def cli() -> None:
    """Worker CLI entrypoint."""


@cli.command()
def start() -> None:
    """Start scheduler."""
    run_scheduler()


if __name__ == "__main__":
    cli()

