# Utiliza una imagen base más pequeña
FROM node:22-alpine3.19 AS builder

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --only=production

# Copia el resto del código fuente
COPY . .

# Compila el código en esta etapa
RUN npm run build

# Segunda etapa para crear una imagen más ligera
FROM node:22-alpine3.19

# Configura el directorio de trabajo en la imagen final
WORKDIR /usr/src/app

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expone el puerto en el que corre la aplicación
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
