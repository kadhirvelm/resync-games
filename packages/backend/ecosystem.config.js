require("dotenv").config();

module.exports = {
  apps: [
    {
      exec_mode: "cluster",
      instances: 1,
      name: "resync-backend",
      script: "./dist/backend/src/main.js",
      env: {
        GAME_ORCHESTRATOR: true
      }
    }
  ]
};
