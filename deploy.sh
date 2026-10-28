#!/bin/sh
# Copies the site from this checkout into a web root on the 20i host.
#
#   sh deploy.sh                 -> deploys to ../public_html   (live)
#   sh deploy.sh staging_html    -> deploys to ../staging_html  (staging)
#
# Referenced from My20i -> Git Version Control -> Deployment Script, and
# runnable by hand over SSH. Files in downloads/ on the server are left alone.
set -eu

REPO="$(cd "$(dirname "$0")" && pwd)"
HOME_DIR="$(dirname "$REPO")"
TARGET="$HOME_DIR/${1:-public_html}"
LOG="$HOME_DIR/deploy.log"

mkdir -p "$TARGET/downloads"
# -a keeps permissions/mtimes; the trailing /. copies contents, not the folder itself.
cp -a "$REPO/public_html/." "$TARGET/"

COMMIT="$(git -C "$REPO" rev-parse --short HEAD 2>/dev/null || echo unknown)"
echo "$(date '+%Y-%m-%d %H:%M:%S')  deployed $COMMIT -> $TARGET" | tee -a "$LOG"
