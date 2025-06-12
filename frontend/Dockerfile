# 1. Stage: Build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# 2. Stage: Serve static files with Nginx
FROM nginx:alpine

# Copy build output to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: replace default nginx config (optional if you want clean routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
