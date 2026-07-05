module.exports = {
  apps: [
    {
      name: "seoallerhand",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/seoallerhand.ru/current",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
      watch: false,
      autorestart: true,
    },
  ],
};
