# Build stage
FROM node:18.20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Production stage
FROM node:18.20-alpine AS production

# Install Chromium and required dependencies
RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    dbus \
    udev \
    xvfb \
    libc6-compat && \
    rm -rf /var/cache/apk/*

# Set environment variables
ENV NODE_ENV=production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# Add these new environment variables for Puppeteer
ENV PUPPETEER_ARGS="--no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage"

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/. .

# Create Chrome directory with correct permissions
RUN mkdir -p /usr/src/app/.cache/puppeteer && \
    chmod -R 777 /usr/src/app/.cache/puppeteer

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "bin/www"]