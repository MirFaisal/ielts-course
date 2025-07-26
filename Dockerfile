# Base image with Node.js 22 (Alpine = small, fast)
FROM node:22.17.0-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source code
COPY . .

# Build Next.js app
RUN npm run build

# -------------------------------
# PRODUCTION IMAGE
# -------------------------------
FROM node:22.17.0-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set user
USER nextjs

# Expose the app port
EXPOSE 3000

# Start the app using the standalone server
CMD ["node", "server.js"]
