# RestaurantGraphQL API

The RestaurantGraphQL API is a GraphQL-based API designed to handle multiple restaurants in a shop store. It provides various features such as searching for restaurants in a city, finding the nearest restaurant, retrieving a list of foods offered by a restaurant, and more. This README file provides an overview of the API and instructions on how to use it.

## Features

The RestaurantGraphQL API offers the following features:

- Search in a city: Users can search for restaurants in a specific city by providing the city name as a parameter.
- Distance calculation: The API can calculate the distance between a given location and all the restaurants, enabling users to find the nearest restaurant.
- Retrieve restaurant details: Users can retrieve detailed information about a specific restaurant, including its name, address, contact details, opening hours, and more.
- Get a list of foods: The API allows users to fetch a list of foods offered by a restaurant, including their names, descriptions, prices, and any other relevant details.
- Filtering: Users can apply various filters while searching for restaurants, such as food , price range, ratings, and more.

## Installation

To run the RestaurantGraphQL API locally, follow these steps:

Clone the repository:

```bash
git clone https://github.com/BaseMax/RestaurantGraphQL
```

Navigate to the project directory:

```bash
cd RestaurantGraphQL
```

Install the dependencies:

```bash
npm install
```

Set up the environment variables:

- Create a `.env` file in the project root.
- Define the necessary environment variables, such as the database connection details and API keys.

Start the server:

```bash
npm start
```

The API will be available at http://localhost:3000.

## Usage

To interact with the RestaurantGraphQL API, you need a GraphQL client or an API testing tool. Here's an example using cURL:

Make a POST request to the API endpoint (http://localhost:3000/graphql) with the following headers:

```bash
Content-Type: application/json
```

Send a GraphQL query as the request payload. Here's an example query to search for restaurants in a city:

```graphql
query RestaurantByCity($city: String!) {
  restaurantByCity(city: $city) {
    name
    _id
    location {
      latitude
      longitude
    }
    foods {
      price
      name
      description
    }
  }
}
```

Replace "New York" with the desired city name.

Receive the response from the server, containing the list of restaurants in the specified city.

For detailed documentation on the available queries, mutations, and types, refer to the API documentation or the GraphQL schema.

## Examples

Here are some additional examples of GraphQL queries and mutations for various features of the RestaurantGraphQL API:

### Search in a City

Request:

```graphql
query RestaurantByCity($city: String!) {
  restaurantByCity(city: $city) {
    name
    _id
    location {
      latitude
      longitude
    }
    foods {
      price
      name
      description
    }
  }
}
```

Body :

```graphql
{
  "city": london
}

```

Response:

```json
{
  "data": {
    "restaurantByCity": [
      {
        "name": "kababi",
        "_id": "649a14c72763b1002ad672c5",
        "location": {
          "latitude": -0.1379,
          "longitude": 51.5874
        },
        "foods": [
          {
            "price": 2000,
            "name": "kabab",
            "description": null
          },
          {
            "price": 200,
            "name": "mast",
            "description": null
          },
          {
            "price": 1000,
            "name": "gosht",
            "description": null
          },
          {
            "price": 3000,
            "name": "ghorme",
            "description": null
          }
        ]
      }
    ]
  }
}
```

### Calculate Distance

Request:

```graphql
query GetRestaurantWithDistance($locationInput: LocationInput!) {
  getRestaurantWithDistance(locationInput: $locationInput) {
    _id
    name
    location {
      longitude
      latitude
    }
  }
}
```

Body :

```json
{
  "locationInput": {
    "latitude": -0.1379,
    "longitude": 51.5874
  }
}
```

Response:

```json
{
  "data": {
    "getRestaurantWithDistance": [
      {
        "_id": "649a14c72763b1002ad672c5",
        "name": "kababi",
        "location": {
          "longitude": 51.5874,
          "latitude": -0.1379
        }
      }
    ]
  }
}
```

### Retrieve Restaurant Details

Request:

```graphql
query RestaurantById($restaurantByIdId: String!) {
  restaurantById(id: $restaurantByIdId) {
    name
    address
    city
    foods {
      price
      description
      name
    }
  }
}
```

Body :

```json
{
  "restaurantByIdId": "649a14c72763b1002ad672c5"
}
```

Response:

```json
{
  "data": {
    "restaurantById": {
      "name": "kababi",
      "address": "1 London Bridge St, London SE1 9BG",
      "city": "london",
      "foods": [
        {
          "price": 2000,
          "description": null,
          "name": "kabab"
        },
        {
          "price": 200,
          "description": null,
          "name": "mast"
        },
        {
          "price": 1000,
          "description": null,
          "name": "gosht"
        },
        {
          "price": 3000,
          "description": null,
          "name": "ghorme"
        }
      ]
    }
  }
}
```

### Get List of Foods

Request:

```graphql
query RestaurantById($restaurantByIdId: String!) {
  restaurantById(id: $restaurantByIdId) {
    foods {
      price
      name
      description
    }
  }
}
```

Body :

```json
{
  "restaurantByIdId": "649a14c72763b1002ad672c5"
}
```

Response:

```json
{
  "data": {
    "restaurantById": {
      "foods": [
        {
          "price": 2000,
          "name": "kabab",
          "description": null
        },
        {
          "price": 200,
          "name": "mast",
          "description": null
        },
        {
          "price": 1000,
          "name": "gosht",
          "description": null
        },
        {
          "price": 3000,
          "name": "ghorme",
          "description": null
        }
      ]
    }
  }
}
```

### Filtering Restaurants

Request:

```graphql
query SearchQuery($querySearch: QuerySearchInput!) {
  searchQuery(querySearch: $querySearch) {
    name
    address
    rating
    foods {
      price
      description
      name
    }
  }
}
```

Body :

```json
{
  "querySearch": {
    "rating": 3,
    "food": "kabab",
    "name": "kakabi"
  }
}
```

Response:

```json
{
  "data": {
    "searchQuery": []
  }
}
```

### Create a Restaurant

Request:

```graphql
mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {
  createRestaurant(createRestaurantInput: $createRestaurantInput) {
    address
    contact {
      email
      phone
    }
    location {
      latitude
      longitude
    }
    name
    openingHours {
      day
      hours
    }
    rating
    city
    foods {
      name
    }
    _id
  }
}
```

Body :

```json
{
  "createRestaurantInput": {
    "name": "kababi",
    "city": "london",
    "foods": [
      { "name": "kabab", "price": 2000 },
      { "name": "mast", "price": 200 },
      { "name": "gosht", "price": 1000 },
      { "name": "ghorme", "price": 3000 }
    ],
    "contact": {
      "email": "kababigmail.com",
      "phone": "989211828382"
    },
    "location": {
      "latitude": -0.1379,
      "longitude": 51.5874
    },
    "address": "1 London Bridge St, London SE1 9BG",
    "rating": 4,

    "openingHours": [
      { "day": "Monday", "hours": "10:00-22:00" },
      { "day": "Tuesday", "hours": "10:00-22:00" },
      { "day": "Wednesday", "hours": "10:00-22:00" },
      { "day": "Thursday", "hours": "10:00-22:00" },
      { "day": "Friday", "hours": "10:00-23:00" },
      { "day": "Saturday", "hours": "11:00-23:00" },
      { "day": "Sunday", "hours": "11:00-22:00" }
    ]
  }
}
```

Response:

```json
{
  "data": {
    "createRestaurant": {
      "address": "1 London Bridge St, London SE1 9BG",
      "contact": {
        "email": "kababigmail.com",
        "phone": "989211828382"
      },
      "location": {
        "latitude": -0.1379,
        "longitude": 51.5874
      },
      "name": "kababi",
      "openingHours": [
        {
          "day": "Monday",
          "hours": "10:00-22:00"
        },
        {
          "day": "Tuesday",
          "hours": "10:00-22:00"
        },
        {
          "day": "Wednesday",
          "hours": "10:00-22:00"
        },
        {
          "day": "Thursday",
          "hours": "10:00-22:00"
        },
        {
          "day": "Friday",
          "hours": "10:00-23:00"
        },
        {
          "day": "Saturday",
          "hours": "11:00-23:00"
        },
        {
          "day": "Sunday",
          "hours": "11:00-22:00"
        }
      ],
      "rating": 4,
      "city": "london",
      "foods": [
        {
          "name": "kabab"
        },
        {
          "name": "mast"
        },
        {
          "name": "gosht"
        },
        {
          "name": "ghorme"
        }
      ],
      "_id": "649a18652763b1002ad672f7"
    }
  }
}
```

### Get Restaurants rates greater than specified rate

Request:

```graphql
query SearchQuery($querySearch: QuerySearchInput!) {
  searchQuery(querySearch: $querySearch) {
    name
    address
    rating
    foods {
      price
      description
      name
    }
  }
}
```

Body :

```json
{
  "querySearch": {
    "rating": 3
  }
}
```

Response:

```json
{
  "data": {
    "searchQuery": [
      {
        "name": "kababi",
        "address": "1 London Bridge St, London SE1 9BG",
        "rating": 4,
        "foods": [
          {
            "price": 2000,
            "description": null,
            "name": "kabab"
          },
          {
            "price": 200,
            "description": null,
            "name": "mast"
          },
          {
            "price": 1000,
            "description": null,
            "name": "gosht"
          },
          {
            "price": 3000,
            "description": null,
            "name": "ghorme"
          }
        ]
      }
    ]
  }
}
```

### Get Restaurants by Price Range

Request:

```graphql
query {
  restaurantsByPriceRange(minPrice: 10, maxPrice: 20) {
    id
    name
    address
    cuisine
    rating
  }
}
```

Response:

```json
{
  "data": {
    "restaurantsByPriceRange": [
      {
        "id": "1",
        "name": "The Best Pizza",
        "address": "123 Main St",
        "cuisine": "Italian",
        "rating": 4.5
      },
      {
        "id": "3",
        "name": "Sushi Express",
        "address": "456 Cherry Blossom Ave",
        "cuisine": "Japanese",
        "rating": 4.8
      },
      ...
    ]
  }
}
```

### Get Restaurants by food

Request:

```graphql
query SearchQuery($querySearch: QuerySearchInput!) {
  searchQuery(querySearch: $querySearch) {
    name
    address
    rating
    foods {
      price
      description
      name
    }
  }
}
```

Body :

```json
{
  "querySearch": {
    "food": "kabab"
  }
}
```

Response:

```json
{
  "data": {
    "searchQuery": [
      {
        "name": "kababi",
        "address": "1 London Bridge St, London SE1 9BG",
        "rating": 4,
        "foods": [
          {
            "price": 2000,
            "description": null,
            "name": "kabab"
          },
          {
            "price": 200,
            "description": null,
            "name": "mast"
          },
          {
            "price": 1000,
            "description": null,
            "name": "gosht"
          },
          {
            "price": 3000,
            "description": null,
            "name": "ghorme"
          }
        ]
      }
    ]
  }
}
```

### Search Restaurants by Name

Request:

```graphql
query SearchQuery($querySearch: QuerySearchInput!) {
  searchQuery(querySearch: $querySearch) {
    name
    address
    rating
    foods {
      price
      name
    }
  }
}
```

Body :

```json
{
  "querySearch": {
    "name": "kababi"
  }
}
```

Response:

```json
{
  "data": {
    "searchQuery": [
      {
        "name": "kababi",
        "address": "1 London Bridge St, London SE1 9BG",
        "rating": 4,
        "foods": [
          {
            "price": 2000,
            "name": "kabab"
          },
          {
            "price": 200,
            "name": "mast"
          },
          {
            "price": 1000,
            "name": "gosht"
          },
          {
            "price": 3000,
            "name": "ghorme"
          }
        ]
      }
    ]
  }
}
```

These examples showcase a range of additional features and demonstrate how you can use GraphQL queries and mutations to interact with the RestaurantGraphQL API. Feel free to customize and extend them based on your specific requirements.

## Contributing

If you encounter any issues or have suggestions for improvements, please submit an issue or a pull request to the GitHub repository.

## License

The RestaurantGraphQL API is open-source and released under the GPL-V3.0 License. Feel free to use, modify, and distribute the code as per the terms of the license.

Copyright 2023, Max Base
