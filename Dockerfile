FROM node
WORKDIR /opt/backend_service
COPY . .
RUN npm install
CMD ["node", "index.js"]