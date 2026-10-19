#!/usr/bin/env bash
# Builds dist/learn-vocab-tab-<version>.zip with only the files the extension needs, for the Chrome Web Store.
set -euo pipefail

cd "$(dirname "$0")/.."
version=$(node -p "require('./manifest.json').version")
out="dist/learn-vocab-tab-${version}.zip"

mkdir -p dist
rm -f "$out"
zip -rq "$out" manifest.json html css js icons img -x '*.DS_Store'
echo "$out"
