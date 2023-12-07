npm install

npm run start

npm run build:dev

npm run build:prod


# Firebase:

firebase login

use firebase_login and firebase_password for Sign In

npm run build:prod

# create .env file end input firebase parameters:
      REACT_APP_APIKEY
      REACT_APP_AUTHDOMAIN
      REACT_APP_DATABASEURL
      REACT_APP_PROJECTID
      REACT_APP_STORAGEBUCKET
      REACT_APP_MESSAGEINGSENDERID
      REACT_APP_APPID
      REACT_APP_MEASUREMENTID

# firebase deploy
Hosting URL: https://fifteen.web.app or your owned project name...

Project initialization (run once):
# init realtime database:

1. make empty node players/
2. make empty node top/
3. make node stats/:
   {
   games: 0,
   limit: 999999,
   players: 0
   }

4. Firebase Authentication:
   make Anonymous provider.
   (Enable anonymous guest accounts in your application, which lets you enforce user-specific Security and Firebase Rules without requiring credentials from your users)

# TODO:

1. webpack - file-loader Не переносит ./public/icons/\*.png
2. Уменьшить размер билда (leasy loading) для отдельной загрузки массива стран.
3. Загрузить в БД массив стран с флвгами и использовать их при выводе данных
4. Переделать движок передвижения фишек. Реализовать возможность передвигать сразу несколько фишек в ряду или в столбце...
5. исправить настройки на домашнем PC:
 git config --global core.autocrlf false
 создать ssh ключ и загрузить его на github.com
 
 Would you like Code to [periodically run 'git fetch'](https://go.microsoft.com/fwlink/?linkid=865294)
