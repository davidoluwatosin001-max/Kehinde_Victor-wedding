#!/bin/bash

# Ensure node/npm/cloudflared are on PATH
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"

PROJECT_DIR="/Users/user/Downloads/kehinde-victor-wedding"
cd "$PROJECT_DIR"

LOG_FILE="$PROJECT_DIR/supervisor.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "Supervisor watchdog started."

while true; do
  # 1. Check Next.js server on port 3000
  if ! curl -s -f -m 3 http://localhost:3000 > /dev/null 2>&1; then
    log "Warning: Local server not responding on port 3000. Restarting server..."
    OLD_PID=$(lsof -t -i :3000 || true)
    if [ -n "$OLD_PID" ]; then
      kill -9 $OLD_PID || true
      sleep 1
    fi
    nohup ./node_modules/.bin/next start -p 3000 > server.log 2>&1 < /dev/null &
    disown
    log "Started new Next.js server (PID: $!)."
    sleep 3
  fi

  # 2. Check Cloudflare Tunnel process
  TUNNEL_PID=$(pgrep -f "cloudflared tunnel" || true)
  if [ -z "$TUNNEL_PID" ]; then
    log "Warning: Cloudflare tunnel process not found. Starting tunnel..."
    nohup ~/.local/bin/cloudflared tunnel --url http://localhost:3000 > tunnel.log 2>&1 &
    log "Started cloudflared tunnel (PID: $!)."
    sleep 5
  fi

  # 3. Extract and verify current public URL
  if [ -f tunnel.log ]; then
    TUNNEL_URL=$(grep -o 'https://[-a-zA-Z0-9.]*\.trycloudflare\.com' tunnel.log | tail -n 1)
    if [ -n "$TUNNEL_URL" ]; then
      echo "$TUNNEL_URL" > .current_public_url
    fi
  fi

  # Sleep 15 seconds before next health check
  sleep 15
done
