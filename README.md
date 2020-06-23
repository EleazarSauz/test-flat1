# fullstack-interview-test - Instrucciones

El proyecto esta desplegado en s3 para probar directamente la web app [aquí](http://test-flat.s3-website-us-east-1.amazonaws.com).

## Banckend
El backend se encuentra desarrollado en python con el framework django, para poderlo ejecutar es necesario crear un entorno virtual con los comandos:

```sh
python3 -m venv venv

source venv/bin/activate

cd back

pip install -r requirements.txt

python manage.py runserver
```

La base de datos usada es postgres, para facilitar la instalación está montada en RDS de Amazon Web Service, en el archivo .env que fue enviado en privado se encuentran las credenciales para conectarse a ella.



## Frontend 
El frontend está desarrollado en React js, con hooks, para correrlo es necesario tener instalado node js, se navega a la carpeta front y se instalan las dependencias con

```sh
cd front

npm install

npm start
```
