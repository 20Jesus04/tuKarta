# Imagen base de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar todos los archivos
COPY . .

# Instalar dependencias
RUN npm install

# Compilar la app NestJS
RUN npm run build

# Exponer el puerto de la app
EXPOSE 3000

# Comando para arrancar en producción
CMD ["npm", "run", "start:prod"]