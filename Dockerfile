FROM node:22-alpine
# 1. Crear un directorio de trabajo
WORKDIR /app

# 2. Copiar el package.json y package-lock.json
COPY package*.json .

# 3. Instalar dependencias
RUN npm install

# 4. Copiar el resto de los archivos (Código fuente)
COPY . .

# 5 generar el build  
RUN npm run build

# 7. Crear un volumen para la carpeta de logs
VOLUME ["/app/logs"]

# 8. Exponer el puerto
EXPOSE 3000

# 7. Comando para iniciar la aplicación
CMD ["npm", "run", "start"]