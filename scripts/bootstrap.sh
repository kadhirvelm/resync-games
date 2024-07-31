#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install stable
nvm use stable
nvm alias default stable

echo "@@@ Using node version: $(node -v) @@@"

corepack enable
yarn set version 4.3.1
yarn install

echo "@@@ All set @@@"
