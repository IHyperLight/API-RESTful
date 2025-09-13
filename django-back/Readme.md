# Ambientación del back Django

## Instalación de recursos de restframework
```bash
pip install djangorestframework
```
```bash
pip install markdown
```
```bash
pip install django-filter
```
```bash
pip install virtualenv
```
```bash
pip install django-cors-headers
```

## Instalación de python-dotenv, para el manejo de variales de entorno
```bash
pip install python-dotenv
```

## Instalación de Pillow y psycopg2, el primero para manejo de formatos de archivo de imagen y el segundo como adaptador de bases de datos de PostgreSQL
```bash
pip install Pillow
```
```bash
pip install psycopg2
```

## Agregar la librería a INSTALED_APPS en settings
```bash
'rest_framework',
```
```bash
'rest_framework',
```
```bash
'rest_framework.authtoken',
```
```bash
'corsheaders',
```

## Agregar a MIDDLEWARE en settings
```bash
'corsheaders.middleware.CorsMiddleware',
```

## Agregar en settings, para las peticiones del cliente y para la expiración de tokens
```bash
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]
```
```bash
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=45),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=2),
}
```