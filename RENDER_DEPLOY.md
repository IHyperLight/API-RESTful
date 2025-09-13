# Despliegue en Render - Instrucciones Completas

## 📋 Preparación del Proyecto

El proyecto ya está configurado para Render con:
- ✅ SQLite como base de datos (sin configuración externa)
- ✅ CORS configurado
- ✅ Archivos de build listos
- ✅ Requirements.txt actualizado
- ✅ Configuración de producción

## 🚀 Pasos para Desplegar en Render

### 1. Subir código a GitHub
```bash
git add .
git commit -m "Configuración para Render"
git push origin main
```

### 2. Crear Servicio Backend (Django API)

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración del servicio:
   - **Name**: `django-api` (o el nombre que prefieras)
   - **Environment**: `Python`
   - **Build Command**: `./build.sh`
   - **Start Command**: `cd django-back && gunicorn primerApp.wsgi:application`
   - **Plan**: Free

5. Variables de entorno (Environment Variables):
   ```
   DEBUG = False
   SECRET_KEY = [Render generará automáticamente]
   ```

6. Haz clic en "Create Web Service"

### 3. Crear Servicio Frontend (React)

1. Haz clic en "New +" → "Static Site"
2. Conecta el mismo repositorio
3. Configuración del sitio:
   - **Name**: `react-frontend` (o el nombre que prefieras)
   - **Build Command**: `cd react-client && npm install && npm run build`
   - **Publish Directory**: `react-client/build`
   - **Plan**: Free

4. Variables de entorno:
   ```
   REACT_APP_API_URL = [URL de tu backend que acabas de crear]
   ```
   Por ejemplo: `https://django-api-xyz.onrender.com`

5. Haz clic en "Create Static Site"

## 🔧 Comandos de Configuración

### Para el Backend:
```bash
# Build Command (ya configurado en build.sh)
pip install -r requirements.txt
cd django-back
python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

# Start Command
cd django-back && gunicorn primerApp.wsgi:application
```

### Para el Frontend:
```bash
# Build Command
cd react-client && npm install && npm run build

# Publish Directory
react-client/build
```

## 📝 URLs de los Servicios

Una vez desplegado, tendrás:
- **Backend API**: `https://tu-backend-name.onrender.com`
- **Frontend**: `https://tu-frontend-name.onrender.com`

## 🔄 Actualizar el Frontend con la URL del Backend

1. Después de que se despliegue el backend, copia su URL
2. Ve a la configuración del frontend en Render
3. Actualiza la variable de entorno:
   ```
   REACT_APP_API_URL = https://tu-backend-real-url.onrender.com
   ```
4. El frontend se rebuildeará automáticamente

⚠️ **IMPORTANTE**: Asegúrate de NO incluir la barra final `/` en la URL del backend.

## ✅ Verificación

1. Abre la URL del frontend
2. Intenta registrar un usuario
3. Inicia sesión
4. Verifica que puedas acceder al perfil

**NOTA**: Todas las URLs del frontend ya están configuradas dinámicamente. Cambiará automáticamente entre localhost (desarrollo) y tu URL de Render (producción).

## 🚨 Notas Importantes

- **SQLite**: Los datos se mantendrán mientras el servicio esté activo
- **Free Tier**: Los servicios se duermen después de 15 minutos de inactividad
- **CORS**: Ya está configurado para permitir todas las origenes
- **Debug**: Está en False para producción

## 🔍 Troubleshooting

Si hay problemas:
1. Revisa los logs en el dashboard de Render
2. Verifica que las URLs estén correctas
3. Asegúrate de que CORS esté permitiendo tu dominio frontend

¡Tu aplicación estará funcionando exactamente igual que en local! 🎉