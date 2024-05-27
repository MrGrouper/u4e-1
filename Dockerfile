FROM node:16 AS frontend-build
WORKDIR /usr/src/app
COPY ./frontend/package*.json ./frontend/ 
RUN npm --prefix ./frontend install
COPY ./frontend/ ./frontend/
RUN npm run build --prefix ./frontend

# Now, build the backend and copy the frontend build
FROM node:16 AS backend-build
WORKDIR /usr/src/app
COPY ./backend/package*.json ./
RUN npm install
COPY . .
COPY --from=frontend-build /usr/src/app/frontend/dist ./public

EXPOSE 8080

CMD ["node", "backend/dist/index.js"]