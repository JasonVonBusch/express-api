FROM node

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Bundle app source
ADD . /app

# Install app dependencies and compile
RUN npm run build

#Expose the port the service is using
EXPOSE 4242
CMD [ "node", "dist/server.js" ]