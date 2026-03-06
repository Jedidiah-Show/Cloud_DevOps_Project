module.exports = {
  apps: [
    {
      name: 'ruach',
      script: 'server.js',
      instances: 1,              // single instance
      autorestart: true,         // restarts on crash
      watch: false,              // set true if you want auto-reload on code changes
      max_memory_restart: '200M',// restart if memory exceeds 200MB
      env: {
        NODE_ENV: 'development',
        PORT: 5000               // default port
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};

