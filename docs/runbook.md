# PocketBase Runbook

## Running Locally

```bash
docker compose -f infra/docker-compose.yml up -d
```

This builds a PocketBase image from the official release archive and starts it on port `8090`.

Visit [http://localhost:8090/\_/](http://localhost:8090/_/) to create the initial admin account.

### Quick manual run

To verify your setup without Compose:

```bash
docker build -f infra/pocketbase/Dockerfile -t pocketbase-local infra/pocketbase
docker run --name pb -p 8090:8080 -v pb_data:/pb/pb_data -v pb_public:/pb/pb_public pocketbase-local
```

Check the admin UI at [http://localhost:8090/\_/](http://localhost:8090/_/) or the health endpoint:

```bash
curl http://localhost:8090/api/health
```

## Backups

Snapshot the data volume:

```bash
docker run --rm -v pb_data:/data alpine tar czf - /data > pb_backup_$(date +%F).tgz
```

## Health Check

PocketBase exposes `/api/health` which returns `200` when the service is ready.
