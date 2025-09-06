# PocketBase Runbook

## Running Locally

```bash
docker compose -f infra/docker-compose.yml up -d
```

If the image pull fails, authenticate to the GitHub Container Registry:

```bash
echo "$GITHUB_TOKEN" | docker login ghcr.io -u USERNAME --password-stdin
```

Visit [http://localhost:8090/\_/](http://localhost:8090/_/) to create the initial admin account.

## Backups

Snapshot the data volume:

```bash
docker run --rm -v pb_data:/data alpine tar czf - /data > pb_backup_$(date +%F).tgz
```

## Health Check

PocketBase exposes `/api/health` which returns `200` when the service is ready.
