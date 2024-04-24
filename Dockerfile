# Build the React application
FROM node:16 as build-stage
WORKDIR /app
COPY ./frontend/package*.json ./frontend/
RUN npm install --prefix frontend
COPY ./frontend/ ./frontend/
RUN npm run build --prefix frontend

# Build the Node.js backend including the built frontend
FROM node:16 as production-stage
WORKDIR /app
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend/ ./
# Copy the built frontend from the previous stage
COPY --from=build-stage app/frontend/dist app/frontend/public
EXPOSE 4000
CMD ["node", "index.js"]