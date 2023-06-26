import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = moduleFixture.get(getConnectionToken());

    await app.init();
  });

  afterAll(async () => {
    const collection = connection.db.collection('restaurants');

    await collection.deleteMany({});
    await app.close();
    await connection.close();
  });

  beforeEach(async () => {
    const collection = connection.db.collection('restaurants');
    const createRestaurantInput = {
      name: 'Test Restaurant',
      city: 'Test City',
      location: {
        latitude: 0,
        longitude: 0,
      },
      address: 'Test Address',
      rating: 5,
      foods: [
        {
          description: 'Test Food 1',
          price: 10,
          name: 'Food 1',
        },
        {
          description: 'Test Food 2',
          price: 15,
          name: 'Food 2',
        },
      ],
      contact: {
        email: 'test@test.com',
        phone: '1234567890',
      },
      openingHours: [
        {
          day: 'MONDAY',
          hours: '10:00 AM - 6:00 PM',
        },
        {
          day: 'TUESDAY',
          hours: '9:00 AM - 5:00 PM',
        },
      ],
    };

    const input = {
      createRestaurantInput: {
        name: 'kababi',
        city: 'london',
        foods: [
          { name: 'kabab', price: 2000 },
          { name: 'mast', price: 200 },
          { name: 'gosht', price: 1000 },
          { name: 'ghorme', price: 3000 },
        ],
        contact: {
          email: 'kababigmail.com',
          phone: '989211828382',
        },
        location: {
          latitude: -0.1379,
          longitude: 51.5874,
        },
        address: '1 London Bridge St, London SE1 9BG',
        rating: 4,

        openingHours: [
          { day: 'Monday', hours: '10:00-22:00' },
          { day: 'Tuesday', hours: '10:00-22:00' },
          { day: 'Wednesday', hours: '10:00-22:00' },
          { day: 'Thursday', hours: '10:00-22:00' },
          { day: 'Friday', hours: '10:00-23:00' },
          { day: 'Saturday', hours: '11:00-23:00' },
          { day: 'Sunday', hours: '11:00-22:00' },
        ],
      },
    };

    await collection.insertMany([createRestaurantInput, input]);
  });

  describe('Restaurant', () => {
    it('should create restaurant', async () => {
      const createRestaurantInput = {
        name: 'Test Restaurant',
        city: 'Test City',
        location: {
          latitude: 0,
          longitude: 0,
        },
        address: 'Test Address',
        rating: 5,
        foods: [
          {
            description: 'Test Food 1',
            price: 10,
            name: 'Food 1',
          },
          {
            description: 'Test Food 2',
            price: 15,
            name: 'Food 2',
          },
        ],
        contact: {
          email: 'test@test.com',
          phone: '1234567890',
        },
        openingHours: [
          {
            day: 'MONDAY',
            hours: '10:00 AM - 6:00 PM',
          },
          {
            day: 'TUESDAY',
            hours: '9:00 AM - 5:00 PM',
          },
        ],
      };
      const mutation = `mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {
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
      
      `;

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: mutation,
          createRestaurantInput,
        });

      expect(response.status).toBe(200);
    });

    it('should calculate the distance', async () => {
      const query = `query GetRestaurantWithDistance($locationInput: LocationInput!) {
        getRestaurantWithDistance(locationInput: $locationInput) {
          _id
          name
          location {
            longitude
            latitude
          }
        }
      }`;

      const givenLocation = {
        locationInput: {
          latitude: -0.1379,
          longitude: 51.5874,
        },
      };

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: query,
          givenLocation,
        });

      console.log(response.body);

      expect(response.status).toBe(200);
    });
  });
});
