#!/usr/bin/env bash
set -euo pipefail

APP_NAME="seoallerhand"
DOMAIN="seoallerhand.ru"
APP_DIR="/var/www/${DOMAIN}/current"
REPO_URL="https://github.com/daniiltereshin27-coder/AllSEO.git"

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo bash scripts/beget-vps-deploy.sh"
  exit 1
fi

apt update
apt install -y git nginx curl ca-certificates certbot python3-certbot-nginx

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

mkdir -p "/var/www/${DOMAIN}"

if [ ! -d "${APP_DIR}/.git" ]; then
  git clone "${REPO_URL}" "${APP_DIR}"
else
  git -C "${APP_DIR}" pull --ff-only
fi

cd "${APP_DIR}"

if [ ! -f ".env.production" ]; then
  cp .env.production.example .env.production
  echo "Created ${APP_DIR}/.env.production. Fill LEAD_WEBHOOK_URL before checking forms."
fi

npm ci
npm run build

cat > "/etc/nginx/sites-available/${DOMAIN}" <<NGINX
server {
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

ln -sfn "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
nginx -t
systemctl reload nginx

pm2 startOrRestart ecosystem.config.cjs --only "${APP_NAME}"
pm2 save

echo "Application is running behind nginx for ${DOMAIN}."
echo "If DNS already points to this VPS, issue SSL:"
echo "certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
