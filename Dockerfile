FROM node:18.15

WORKDIR /app

COPY . .

# Install all dependencies at the root level    

# Build the client part of the application
WORKDIR /app/client
RUN npm install && npm run build
COPY . .
WORKDIR /app/server
RUN npm install 
COPY . .

# Expose the ports your backend server and frontend assets listen on
EXPOSE 9005
EXPOSE 3000

ENV BASE_URL=http://65.1.92.181
WORKDIR /app/server
CMD ["npm","start"]



