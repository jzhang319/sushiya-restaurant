# Use an official Node.js runtime as a parent image
FROM node:16.15.0

# Set the working directory in the container
WORKDIR /react-app

# Copy the current directory contents into the container at /react-app
COPY . /react-app

# Install any needed packages and build the app
RUN npm install
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]
