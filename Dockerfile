

# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY . .

RUN npm install

# Copy the rest of the code into the container
COPY . .

# Expose the port if your bot listens on a specific one
EXPOSE 3000

# Start the bot
CMD ["node", "index.js"]
