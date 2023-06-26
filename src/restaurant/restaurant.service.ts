import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LocationType, Restaurant } from './entities/entity.restaurant';
import { RestaurantDocument } from './entities/model.restaurant';
import { ObjectId } from 'mongodb';
import { NearByInput, QuerySearchInput } from './dto/query.input';
import { getDistance } from 'geolib';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantInput: CreateRestaurantInput) {
    const restaurant = new this.restaurantModel({
      ...createRestaurantInput,
    });

    const { latitude, longitude } = createRestaurantInput.location;
    restaurant.location = {
      latitude,
      longitude,
    };

    return await restaurant.save();
  }

  async findAll() {
    return this.restaurantModel.find({});
  }

  findOne(id: string): Promise<RestaurantDocument> {
    return this.restaurantModel.findOne({
      _id: new ObjectId(id),
    });
  }

  async findByIdOrThrow(id: string): Promise<RestaurantDocument | undefined> {
    const restaurant = await this.restaurantModel.findOne({
      _id: new ObjectId(id),
    });
    console.log(restaurant);

    if (!restaurant)
      throw new HttpException(
        "restaurant with provided id didn't find",
        HttpStatus.BAD_REQUEST,
      );

    return restaurant;
  }

  async getRestaurantsWithDistance(input: NearByInput) {
    const { latitude, longitude } = input;
    const results = (await this.restaurantModel.find({}))
      .map((restaurant) => {
        const restaurantDistance = this.calculateDistance(restaurant, {
          longitude,
          latitude,
        });

        const { _id, address, city, contact, foods, name, rating, location } =
          restaurant;

        return {
          _id,
          address,
          city,
          contact,
          foods,
          name,
          rating,
          location,
          distance: restaurantDistance,
        };
      })
      .sort((peri, after) => (peri.distance > after.distance ? 1 : -1));

    return results;
  }

  calculateDistance(
    restaurant: Omit<RestaurantDocument, 'distance'>,
    location: LocationType,
  ) {
    const { latitude, longitude } = restaurant.location;
    return getDistance(
      {
        latitude,
        longitude,
      },
      location,
    );
  }

  async findByCity(city: string): Promise<RestaurantDocument[]> {
    return await this.restaurantModel.find({
      city: city,
    });
  }

  async search(input: QuerySearchInput) {}
}
