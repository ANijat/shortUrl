# ShortUrl App

Web application that allows users to take a long URL and convert it to a shortened URL both with UI and api.


## Install

    npm install

## Run the app
Mentioned 2 environment variables need to be configured: DATABASE_URL, APP_URL

    node src/index.js


## REST API

/api/graph GET -> Gets all redirection records
```shell
curl --location --request GET 'http://hostname:port/api/graph'
```


/api/url POST -> Creates new short url by destination url

```shell
$ curl --location --request POST 'http://hostname:port/api/url' \
--header 'Content-Type: application/json' \
--data-raw '{
    "destination" : "test.com"
}'
```

/api/:short/stats GET -> Gets count,destination, short by shortid

```shell
curl --location --request GET 'http://hostname:port/api/QlHY/stats'

```
/:short GET -> Redirects to destination url 

```shell
curl --location --request GET 'http://hostname:port/QlHY'

```


