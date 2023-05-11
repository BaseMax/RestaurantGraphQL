# RestaurantGraphQL API

The RestaurantGraphQL API is a GraphQL-based API designed to handle multiple restaurants in a shop store. It provides various features such as searching for restaurants in a city, finding the nearest restaurant, retrieving a list of foods offered by a restaurant, and more. This README file provides an overview of the API and instructions on how to use it.

## Features

The RestaurantGraphQL API offers the following features:

- Search in a city: Users can search for restaurants in a specific city by providing the city name as a parameter.
- Distance calculation: The API can calculate the distance between a given location and all the restaurants, enabling users to find the nearest restaurant.
- Retrieve restaurant details: Users can retrieve detailed information about a specific restaurant, including its name, address, contact details, opening hours, and more.
- Get a list of foods: The API allows users to fetch a list of foods offered by a restaurant, including their names, descriptions, prices, and any other relevant details.
- Filtering: Users can apply various filters while searching for restaurants, such as cuisine type, price range, ratings, and more.

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
query {
  restaurants(city: "New York") {
    id
    name
    address
    cuisine
    rating
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
query {
  restaurants(city: "London") {
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
    "restaurants": [
      {
        "id": "1",
        "name": "The Best Pizza",
        "address": "123 Main St",
        "cuisine": "Italian",
        "rating": 4.5
      },
      {
        "id": "2",
        "name": "Burger Joint",
        "address": "456 Elm St",
        "cuisine": "American",
        "rating": 4.2
      },
      ...
    ]
  }
}
```

### Calculate Distance

Request:

```graphql
query {
  calculateDistance(latitude: 40.7128, longitude: -74.0060) {
    restaurant {
      id
      name
      address
      distance
    }
  }
}
```

Response:

```json
{
  "data": {
    "calculateDistance": [
      {
        "restaurant": {
          "id": "1",
          "name": "The Best Pizza",
          "address": "123 Main St",
          "distance": 2.3
        }
      },
      {
        "restaurant": {
          "id": "2",
          "name": "Burger Joint",
          "address": "456 Elm St",
          "distance": 1.8
        }
      },
      ...
    ]
  }
}
```

### Retrieve Restaurant Details

Request:

```graphql
query {
  restaurant(id: "1") {
    name
    address
    contact {
      phone
      email
    }
    openingHours {
      day
      hours
    }
  }
}
```

Response:

```json
{
  "data": {
    "restaurant": {
      "name": "The Best Pizza",
      "address": "123 Main St",
      "contact": {
        "phone": "555-1234",
        "email": "info@bestpizza.com"
      },
      "openingHours": [
        {
          "day": "Monday",
          "hours": "11:00 AM - 9:00 PM"
        },
        {
          "day": "Tuesday",
          "hours": "11:00 AM - 9:00 PM"
        },
        ...
      ]
    }
  }
}
```

### Get List of Foods

Request:

```graphql
query {
  foods(restaurantId: "1") {
    id
    name
    description
    price
  }
}
```

Response:

```json
{
  "data": {
    "foods": [
      {
        "id": "1",
        "name": "Margherita Pizza",
        "description": "Classic cheese and tomato pizza",
        "price": 12.99
      },
      {
        "id": "2",
        "name": "Pepperoni Pizza",
        "description": "Pizza topped with pepperoni slices",
        "price": 14.99
      },
      ...
    ]
  }
}
```

### Filtering Restaurants

Request:

```graphql
query {
  restaurants(city: "Paris", cuisine: "French", priceRange: { min: 20, max: 50 }) {
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
    "restaurants": [
      {
        "id": "1",
        "name": "Le Petit Bistro",
        "address": "789 Rue de la Paix",
        "cuisine": "French",
        "rating": 4.8
      },
      {
        "id": "2",
        "name": "La Brasserie",
        "address": "456 Avenue des Champs-Élysées",
        "cuisine": "French",
        "rating": 4.5
      },
      ...
    ]
  }
}
```

### Create a Restaurant

Request:

```graphql
mutation {
  createRestaurant(
    name: "Sushi Express",
    address: "123 Sakura St",
    city: "Tokyo",
    cuisine: "Japanese",
    rating: 4.6
  ) {
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
    "createRestaurant": {
      "id": "3",
      "name": "Sushi Express",
      "address": "123 Sakura St",
      "cuisine": "Japanese",
      "rating": 4.6
    }
  }
}
```

### Update Restaurant Details

Request:

```graphql
mutation {
  updateRestaurant(
    id: "3",
    address: "456 Cherry Blossom Ave",
    rating: 4.8
  ) {
    id
    name
    address
    rating
  }
}
```

Response:

```json
{
  "data": {
    "updateRestaurant": {
      "id": "3",
      "name": "Sushi Express",
      "address": "456 Cherry Blossom Ave",
      "rating": 4.8
    }
  }
}
```

### Delete a Restaurant

Request:

```graphql
mutation {
  deleteRestaurant(id: "3") {
    id
    name
    address
  }
}
```

Response:

```json
{
  "data": {
    "deleteRestaurant": {
      "id": "3",
      "name": "Sushi Express",
      "address": "456 Cherry Blossom Ave"
    }
  }
}
```

### Get Reviews for a Restaurant

Request:

```graphql
query {
  restaurant(id: "1") {
    name
    reviews {
      id
      rating
      comment
      user {
        name
      }
    }
  }
}
```

Response:

```json
{
  "data": {
    "restaurant": {
      "name": "The Best Pizza",
      "reviews": [
        {
          "id": "1",
          "rating": 5,
          "comment": "Delicious pizza! Highly recommended.",
          "user": {
            "name": "John Doe"
          }
        },
        {
          "id": "2",
          "rating": 4,
          "comment": "Good pizza, but could be better.",
          "user": {
            "name": "Jane Smith"
          }
        },
        ...
      ]
    }
  }
}
```

### Add a Review for a Restaurant

Request:

```graphql
mutation {
  addReview(
    restaurantId: "1",
    rating: 4,
    comment: "Great service and tasty food!"
  ) {
    id
    rating
    comment
    user {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "addReview": {
      "id": "3",
      "rating": 4,
      "comment": "Great service and tasty food!",
      "user": {
        "name": "Emily Johnson"
      }
    }
  }
}
```

### Get Popular Restaurants

Request:

```graphql
query {
  popularRestaurants(limit: 5) {
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
    "popularRestaurants": [
      {
        "id": "1",
        "name": "The Best Pizza",
        "address": "123 Main St",
        "cuisine": "Italian",
        "rating": 4.5
      },
      {
        "id": "4",
        "name": "Taco Fiesta",
        "address": "789 Elm St",
        "cuisine": "Mexican",
        "rating": 4.3
      },
      ...
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

### Get Restaurants by Cuisine Type

Request:

```graphql
query {
  restaurantsByCuisine(cuisine: "Chinese") {
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
    "restaurantsByCuisine": [
      {
        "id": "1",
        "name": "Taste of China",
        "address": "123 Main St",
        "cuisine": "Chinese",
        "rating": 4.5
      },
      {
        "id": "2",
        "name": "Dragon Palace",
        "address": "456 Elm St",
        "cuisine": "Chinese",
        "rating": 4.2
      },
      ...
    ]
  }
}
```

### Search Restaurants by Name

Request:

```graphql
query {
  searchRestaurantsByName(name: "Pizza") {
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
    "searchRestaurantsByName": [
      {
        "id": "1",
        "name": "The Best Pizza",
        "address": "123 Main St",
        "cuisine": "Italian",
        "rating": 4.5
      },
      {
        "id": "5",
        "name": "Pizza Hut",
        "address": "789 Elm St",
        "cuisine": "Italian",
        "rating": 4.0
      },
      ...
    ]
  }
}
```

### Get Nearby Restaurants

Request:

```graphql
query {
  nearbyRestaurants(latitude: 40.7128, longitude: -74.0060, radius: 5) {
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
    "nearbyRestaurants": [
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

### Create a Food Item

Request:

```graphql
mutation {
  createFood(
    restaurantId: "1",
    name: "Cheeseburger",
    description: "Juicy beef patty with melted cheese",
    price: 9.99
  ) {
    id
    name
    description
    price
  }
}
```

Response:

```json
{
  "data": {
    "createFood": {
      "id": "6",
      "name": "Cheeseburger",
      "description": "Juicy beef patty with melted cheese",
      "price": 9.99
    }
  }
}
```

### Update a Food Item

Request:

```graphql
mutation {
  updateFood(
    id: "6",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with American cheese",
    price: 10.99
  ) {
    id
    name
    description
    price
  }
}
```

Response:

```json
{
    ...
}
```



These examples showcase a range of additional features and demonstrate how you can use GraphQL queries and mutations to interact with the RestaurantGraphQL API. Feel free to customize and extend them based on your specific requirements.

## Contributing

If you encounter any issues or have suggestions for improvements, please submit an issue or a pull request to the GitHub repository.

## License

The RestaurantGraphQL API is open-source and released under the GPL-V3.0 License. Feel free to use, modify, and distribute the code as per the terms of the license.
