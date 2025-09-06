# PocketBase Runbook

## Running Locally

Set the admin credentials (or place them in a `.env` file) and start the service:

```bash
PB_ADMIN_EMAIL=admin@example.com PB_ADMIN_PASSWORD="ChangeMe!Strong1" docker compose up -d pocketbase
```

The container mounts its data at `/pb/pb_data` and, on first run, creates an admin if none exists using the provided credentials. After the first successful start you may remove the variables; subsequent runs will use the persisted data.

Visit [http://localhost:8090/\_/](http://localhost:8090/_/) to log in with the seeded admin.

### Quick manual run

To verify your setup without Compose:

```bash
docker build -f infra/pocketbase/Dockerfile -t pocketbase-local infra/pocketbase
docker run --name pb -p 8090:8090 -v pb_data:/pb/pb_data -v pb_public:/pb/pb_public \
  -e PB_ADMIN_EMAIL=admin@example.com -e PB_ADMIN_PASSWORD="ChangeMe!Strong1" \
  pocketbase-local sh -c '
    if ! /pb/pocketbase --dir /pb/pb_data admin list | grep -q "@"; then
      /pb/pocketbase --dir /pb/pb_data admin create "$PB_ADMIN_EMAIL" "$PB_ADMIN_PASSWORD";
    fi;
    exec /pb/pocketbase --dir /pb/pb_data serve --http 0.0.0.0:8090
  '
```

Check the admin UI at [http://localhost:8090/\_/](http://localhost:8090/_/) or the health endpoint:

```bash
curl http://localhost:8090/api/health
```

### Resetting the database

To wipe all PocketBase data and start fresh:

```bash
docker compose down
docker volume rm automation_pb_data automation_pb_public
docker volume prune  # removes anonymous volumes
PB_ADMIN_EMAIL=admin@example.com PB_ADMIN_PASSWORD="ChangeMe!Strong1" docker compose up -d pocketbase
```

## Backups

Snapshot the data volume:

```bash
docker run --rm -v pb_data:/data alpine tar czf - /data > pb_backup_$(date +%F).tgz
```

## Health Check

PocketBase exposes `/api/health` which returns `200` when the service is ready.
