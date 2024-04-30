# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy frontend code into the container
COPY . .

RUN mkdir -p public/images

# Install dependencies
RUN npm install

# Expose the port Next.js runs on (usually 3000)
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "next-dev"]
