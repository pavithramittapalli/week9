# Use the official Node.js 18 image (lightweight version)
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy all files from your machine to the container
COPY . .

# Install dependencies
RUN yarn install --production

# Command to start the application
CMD ["node", "src/index.js"]

# Expose port 3000 to access the app
EXPOSE 3000

