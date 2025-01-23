FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
#CMD ["npm", "run", "start:prod"]
# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]


#URL_API='https://api.innoviclinic.com.br/api/public/'
#URL_SSE='https://sse.innoviclinic.com.br/'
#HOST_MONGODB='mongodb://root:root@213.199.34.152/admin'