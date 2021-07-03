# ShortUrl App


## Install

    npm install

## Run the app
Mentioned 6 environment variables need to be configured: DATABASE_URL, APP_URL

    node src/index.js


## REST API

/api/graph GET -> Gets all redirection records

/api/url POST -> Creates new short url by destination url

/api/:short/stats GET -> Gets count,destination, short by shortid

/:short GET -> Redirects to destination url 
