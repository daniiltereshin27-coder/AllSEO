# Деплой seoallerhand.ru на Beget Cloud / VPS

Проект — Next.js App Router с серверным обработчиком `/api/leads`, поэтому для полноценной работы нужен VPS/Node.js, а не только FTP.

## Что должно быть на сервере

- Ubuntu 22.04/24.04
- Node.js 22 LTS
- nginx
- pm2
- certbot
- домен `seoallerhand.ru`, направленный A-записью на IP сервера

## Переменные окружения

На сервере файл `/var/www/seoallerhand.ru/current/.env.production`:

```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
SMTP_TO=seo@allerhand.ru
LEAD_WEBHOOK_URL=
LEAD_WEBHOOK_SECRET=
NEXT_PUBLIC_YM_ID=
PORT=3000
```

Для рабочей отправки заявок обязательны `SMTP_USER` и `SMTP_PASS`.
`LEAD_WEBHOOK_URL` можно использовать как запасной канал.

## Команды установки

```bash
apt update
apt install -y git nginx curl ca-certificates

curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs
npm install -g pm2

mkdir -p /var/www/seoallerhand.ru
cd /var/www/seoallerhand.ru
git clone https://github.com/daniiltereshin27-coder/AllSEO.git current
cd current

npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

## nginx

Файл `/etc/nginx/sites-available/seoallerhand.ru`:

```nginx
server {
    server_name seoallerhand.ru www.seoallerhand.ru;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активация:

```bash
ln -s /etc/nginx/sites-available/seoallerhand.ru /etc/nginx/sites-enabled/seoallerhand.ru
nginx -t
systemctl reload nginx
```

## SSL

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seoallerhand.ru -d www.seoallerhand.ru
```

## Обновление сайта

```bash
cd /var/www/seoallerhand.ru/current
git pull
npm ci
npm run build
pm2 restart seoallerhand
```
