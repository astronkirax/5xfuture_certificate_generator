# Deployment

The app is live at **https://5xfuture.in/certgen/**

It is a static site (built with `npm run build`) served by the existing nginx on the
VPS, as an isolated subpath of the `5xfuture.in` site. Nothing else on the server was
changed beyond adding one nginx `location` block and one cron job.

## How CI/CD works (pull-based)

The VPS provider drops inbound SSH from cloud/CI IP ranges, so a normal "push from
GitHub Actions over SSH" deploy is not reliable. Instead we use a **pull** model:

```
push to main
   └─► GitHub Actions (.github/workflows/deploy.yml)
          • npm ci && npm run build
          • force-push the built dist/ to the `deploy` branch
   └─► server cron (every 3 min) pulls the `deploy` branch
          • /usr/local/bin/5xfuture-certgen-deploy.sh
          • rsync into /var/www/5xfuture-certgen, fix ownership
```

So: **just push to `main`** — the site updates within ~3 minutes. No secrets or SSH
keys are stored in GitHub (the workflow only uses the built-in `GITHUB_TOKEN`).

## Server-side pieces (all additive, isolated)

| Thing | Path |
|-------|------|
| Web root (static files) | `/var/www/5xfuture-certgen` |
| Pull/deploy script | `/usr/local/bin/5xfuture-certgen-deploy.sh` |
| Git cache of `deploy` branch | `/var/cache/5xfuture-certgen` |
| Deploy log | `/var/log/5xfuture-certgen-deploy.log` |
| Cron (root) | `*/3 * * * *` runs the script under `flock` |
| nginx | `location ^~ /certgen/` added to `/etc/nginx/sites-available/5xfuture` (backup saved as `*.bak-<timestamp>`) |

### nginx block that was added
```nginx
location ^~ /certgen/ {
    alias /var/www/5xfuture-certgen/;
    try_files $uri $uri/ /certgen/index.html;
}
```

## Manual operations

Force an immediate deploy on the server (instead of waiting for cron):
```bash
/usr/local/bin/5xfuture-certgen-deploy.sh
```

Re-run the build/publish workflow without a code change: GitHub → Actions →
"Build and Deploy" → Run workflow (it has `workflow_dispatch`).

## To remove the deployment cleanly
```bash
# 1. remove the nginx block from /etc/nginx/sites-available/5xfuture, then:
nginx -t && systemctl reload nginx
# 2. drop the cron line:  crontab -e   (remove the 5xfuture-certgen line)
# 3. rm -rf /var/www/5xfuture-certgen /var/cache/5xfuture-certgen \
#           /usr/local/bin/5xfuture-certgen-deploy.sh /var/log/5xfuture-certgen-deploy.log
```
