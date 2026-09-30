#!/bin/bash
set -e

# Ensure node/npm/cloudflared are on PATH
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:$PATH"

PROJECT_DIR="/Users/user/Downloads/kehinde-victor-wedding"
cd "$PROJECT_DIR"

echo "=========================================="
echo "💒 Kehinde & Victor Wedding — Safe Update"
echo "=========================================="
echo "[1/4] Building Next.js production build..."
npm run build

echo "[2/4] Build successful! Preparing zero-downtime server restart..."
# Find any existing server PID listening on port 3000
OLD_PID=$(lsof -t -i :3000 || true)

if [ -n "$OLD_PID" ]; then
  echo "Found running server PID: $OLD_PID. Terminating old server..."
  kill -9 $OLD_PID || true
  sleep 1
fi

echo "[3/4] Launching updated server on port 3000..."
nohup ./node_modules/.bin/next start -p 3000 > server.log 2>&1 < /dev/null &
disown
sleep 2

# Wait for server to be ready
echo "Waiting for localhost:3000 to become ready..."
for i in {1..15}; do
  if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✓ Local server is live and responding on http://localhost:3000"
    break
  fi
  sleep 1
done

echo "[4/4] Checking Cloudflare Tunnel status..."
TUNNEL_PID=$(pgrep -f "cloudflared tunnel" || true)

if [ -z "$TUNNEL_PID" ]; then
  echo "Notice: Cloudflare tunnel was not running. Starting tunnel..."
  nohup ~/.local/bin/cloudflared tunnel --url http://localhost:3000 > tunnel.log 2>&1 &
  sleep 4
else
  echo "✓ Cloudflare tunnel is running (PID: $TUNNEL_PID). Public URL remains active and untouched!"
fi

# Print active tunnel URL
if [ -f tunnel.log ]; then
  TUNNEL_URL=$(grep -o 'https://[-a-zA-Z0-9.]*\.trycloudflare\.com' tunnel.log | tail -n 1)
  if [ -n "$TUNNEL_URL" ]; then
    echo "$TUNNEL_URL" > .current_public_url
    echo "=========================================="
    echo "🎉 Update Complete! Public link is LIVE:"
    echo "Guest URL: $TUNNEL_URL"
    echo "Admin URL: $TUNNEL_URL/admin"
    echo "=========================================="
  fi
fi
