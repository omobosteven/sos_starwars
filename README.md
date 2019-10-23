[![Build Status](https://travis-ci.com/omobosteven/sos_starwars.svg?branch=develop)](https://travis-ci.com/omobosteven/sos_starwars)

## SOS_STARWARS_MOVIES
An API for listing the names of starwars movies along with their opening crawls and comment counts, adding and listing anonymous comments and getting character list.

- [Link to API on Heroku](https://sos-starwars.herokuapp.com)

## Content
- [Development Set Up](#development-set-up)
- [API endpoints](#api-endpoints)
- [Request and Response Signature](#endpoints_request_and_response_signature)
- [Technologies Used](#built-with)

## Development set up

- Ensure the following tools are installed on your system.
- Node (v 10.x recommended)
- Redis (service should be running)
- Postgres

- Clone the repo and cd into it
    ```
    git clone https://github.com/omobosteven/sos_starwars.git
    ``` 
 - Install dependencies
    ```
    npm install
    ```
 - Create Application environment variables and save them in .env file in root directory
    ```
	  PORT=3000
      DATABASE_URL=postgres://username:password@host:port/database_name
      REDIS_URL=redis://:password@host:port
    ```
    
  - Run migrations
  	```
  	npm run migrations
	```
	
- Run application
    ```
    npm run start-dev
    ```
    
## API Endpoints
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
    <tr>
      <td>GET</td>
      <td>/api/movies</td>
      <td>Get all movies sorted by released data</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/api/movies/{movie_title}/comments</td>
    <td>Post a comment for a movie</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/movies/{movie_title}/comments</td>
    <td>Get all comments for a movie</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/movies/{movie_title}/characters</td>
    <td>Get all characters in a movie</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/movies/{movie_title}/characters?sort={name, gender:desc, height:asc}</td>
    <td>Get all characters in a movie sorted by one of name, gender or height in ascending or descending order</td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/api/movies/{movie_title}/characters?filter={gender:{male, female}}</td>
    <td>Get all characters in a movie filterd by gender</td>
  </tr>
</table>


## Endpoints Request and Response Signature

### Movies:
`GET /api/movies`


Example response body:

```source-json
{
  "status": "success",
  "message": "Movies retrieved",
  "data":[
        {
            "title": "A New Hope",
            "release_date": "1977-05-25",
            "opening_crawl": "It is a period of civil war.",
            "comment_counts": 0
        },
        {
            "title": "The Empire Strikes Back",
            "release_date": "1980-05-17",
            "opening_crawl": "It is a dark time for the\r\nRebellion.",
            "comment_counts": 0
        }
  ]
}
```

### Comments
`POST /api/{movie_title}/comments`

NB: movie title should be separted with underscore

Example request body:

```source-json
{
	"comment": "This is so cool and it is going to be a very long comment"
}
```

Example response body:

```source-json
{
    "status": "success",
    "message": "Comment created",
    "data": {
        "id": 1,
        "movie_title": "the empire strikes back",
        "public_ip": "54.234.241.82",
        "comment": "This is so cool and it is going to be a very long comment",
        "created_at": "2019-10-23T10:00:37.272Z"
    }
}
```

`GET /api/{movie_title}/comments`

Example response body:

```source-json
{
    "status": "success",
    "message": "Comments retrieved",
    "data": [
        {
            "id": 5,
            "movie_title": "the empire strikes back",
            "comment": "This is so cool and it is a very long comment",
            "public_ip": "41.215.245.118",
            "created_at": "2019-10-22T08:26:36.045Z"
        },
        {
            "id": 4,
            "movie_title": "the empire strikes back",
            "comment": "This is so cool and it is a very long comment",
            "public_ip": "41.215.245.118",
            "created_at": "2019-10-21T16:50:14.003Z"
        }
    ]
}
```

### Characters
`GET /api/{movie_title}/characters`

Example response body:
```source-json
{
    "status": "success",
    "message": "Characters retrieved",
    "data": {
        "total_heights": "8ft and 1.14 inches",
        "total_characters": 1,
        "characters" : [
            {
                "name": "Luke Skywalker",
                "height": "172",
                "mass": "77",
                "hair_color": "blond",
                "skin_color": "fair",
                "eye_color": "blue",
                "birth_year": "19BBY",
                "gender": "male",
                "homeworld": "https://swapi.co/api/planets/1/",
                "films": [
                    "https://swapi.co/api/films/2/",
                ],
                "species": [
                    "https://swapi.co/api/species/1/"
                ],
                "vehicles": [
                    "https://swapi.co/api/vehicles/14/",
                    "https://swapi.co/api/vehicles/30/"
                ],
                "starships": [
                    "https://swapi.co/api/starships/12/",
                    "https://swapi.co/api/starships/22/"
                ],
                "created": "2014-12-09T13:50:51.644000Z",
                "edited": "2014-12-20T21:17:56.891000Z",
                "url": "https://swapi.co/api/people/1/"
            }
        ]
    }
}
```

NB: endpoint can be sorted by one of name, gender or height in ascending or decending order and can also be filtered by gender

/api/{movie_title}/characters?sort=(example: name, name:asc, name:desc)&filter=(gender:male, gender:female)

## Built with
- Javascript
- Node (v 10.x)
- Express
- Sequelize
- Postgres
- Redis
- Heroku
