import os
import django
from django.conf import settings
from django.contrib.auth.models import User

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'primerApp.settings')
django.setup()

# Create superuser if not exists
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created successfully')
else:
    print('Superuser already exists')