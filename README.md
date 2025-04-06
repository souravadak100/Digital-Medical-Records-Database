# Digital Medical Records Database (DMRD)

 DMRD is a digital medical records keeping app, built using Django and Django-Rest-Framework for Backend and React for Frontend.
 
 **Demo of this site available here** [DMRD](http://github.com)

## Frontend (React.JS)

To install the necessary dependencies / packages, locate ".install.sh" and from any bash terminal

```bash
sh .install.sh
```
The above step install the necessary dependencies for Frontend as well as Backend.

To start the server & load up the app in the browser client

```bash
npm install
```

To generate a Production build

```bash
npm run build
```

**Note:** I have used proxy "http://127.0.0.1:8001" for "api" using "createProxyMiddleware"

## Backend (Django)

To migrate the database open terminal in Backend directory and type

```bash
py manage.py makemigrations
py manage.py migrate
```

To run the program in local server use the following command

```bash
py manage.py runserver 0.0.0.0:8001
```

**Note:** Server will be available at http://127.0.0.1:8001 in your browser.

**========Thank You !!!=========**

