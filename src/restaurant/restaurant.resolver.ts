import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/entity.restaurant';
import {
  CreateRestaurantInput,
  LocationInput,
} from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { throws } from 'assert';
import { ReturnDocument } from 'mongodb';
import { NearByInput, QuerySearchInput } from './dto/query.input';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return await this.restaurantService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'searchQuery' })
  async search(@Args('querySearch') querySearch: QuerySearchInput) {
    return await this.restaurantService.search(querySearch);
  }

  @Query(() => [Restaurant])
  async getRestaurantWithDistance(@Args('locationInput') location: LocationInput) {
    return await this.restaurantService.getRestaurantsWithDistance(location);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurantById' })
  async findOne(@Args('id') id: string) {
    console.log(id);

    return await this.restaurantService.findByIdOrThrow(id);
  }

  @Query(() => [Restaurant], { name: 'restaurantByCity' })
  async findByCity(@Args('city') city: string) {
    return await this.restaurantService.findByCity(city);
  }
}
