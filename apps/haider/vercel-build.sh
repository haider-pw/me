#!/bin/sh
# Install pnpm
npm install -g pnpm
# Install dependencies using pnpm
pnpm install
# Build your project using Nuxt directly
npx nuxt build
