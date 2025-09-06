# PocketBase Runbook

## Running Locally

```bash
docker compose -f infra/docker-compose.yml up -d
```

The PocketBase image is public on GitHub Container Registry and usually pulls without authentication. If your environment blocks anonymous pulls, authenticate:

```bash
echo "$GITHUB_TOKEN" | docker login ghcr.io -u USERNAME --password-stdin
```

Visit [http://localhost:8090/\_/](http://localhost:8090/_/) to create the initial admin account.

### Quick manual run

You can also pull and run PocketBase directly to verify your setup:

```bash
docker pull ghcr.io/pocketbase/pocketbase:v0.29.3
docker run --name pb -p 8090:8090 -v pb_data:/pb_data -v pb_public:/pb_public ghcr.io/pocketbase/pocketbase:v0.29.3 serve --http 0.0.0.0:8090
```

Open the admin UI at [http://localhost:8090/\_/](http://localhost:8090/_/) or check the health endpoint:

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
