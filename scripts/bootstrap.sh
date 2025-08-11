#!/bin/bash

curl -fsSL https://bun.com/install | bash
nvm install stable
nvm use stable
nvm alias default stable

echo "@@@ Using node version: $(node -v) @@@"

corepack enable
brew install oven-sh/bun/bun

echo "@@@ All set @@@"
