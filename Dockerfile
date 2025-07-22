# Use the official Node.js 20 Alpine Linux image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Create a non-root user to run the application
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy package.json and package-lock.json for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install && npm cache clean --force

# Copy the application source code (excluding node_modules via .dockerignore)
COPY . .

# Change ownership of the app directory to the nodeuser
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expose the port the app runs on (matching application default)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check to verify the application is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const options = { hostname: 'localhost', port: process.env.PORT || 3000, path: '/health', timeout: 2000 }; const req = http.request(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => process.exit(1)); req.end();"

# Start the application
CMD ["npm", "start"]