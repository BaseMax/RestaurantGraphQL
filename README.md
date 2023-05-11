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

## Contributing

If you encounter any issues or have suggestions for improvements, please submit an issue or a pull request to the GitHub repository.

## License

The RestaurantGraphQL API is open-source and released under the GPL-V3.0 License. Feel free to use, modify, and distribute the code as per the terms of the license.
