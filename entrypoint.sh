#!/bin/bash
node --version
npm --version

cd frontend
npm ci --also=dev
npm run build

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate


python manage.py runserver 0.0.0.0:$PORT