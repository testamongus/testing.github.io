# chatgpt generated shell files!!!!

# Download and run the NVM installation script
curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Source NVM to use it in the current shell session
. ~/.nvm/nvm.sh

# Check the version of NVM installed
nvm --version

# Install Node.js version 16
nvm install 16

# Use Node.js version 16 for the current shell session
nvm use 16

# Install pnpm globally
npm install -g pnpm

# Install project dependencies using pnpm
pnpm i --shamefully-hoist

# Install webpack-dev-server locally
pnpm add --save-dev webpack-dev-server

# Start webpack dev server
npx webpack-dev-server --open
