import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantSchema } from './entities/model.restaurant';
import { Restaurant } from './entities/entity.restaurant';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
