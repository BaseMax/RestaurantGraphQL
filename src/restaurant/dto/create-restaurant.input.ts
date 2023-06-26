import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, Max, Min } from 'class-validator';
import { Weekday } from '../entities/entity.restaurant';

registerEnumType(Weekday, {
  name: 'Weekday',
});

@InputType()
export class ContactInput {
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsPhoneNumber()
  @Field({ nullable: true })
  phone?: string;
}
@InputType()
export class LocationInput {
  @Field()
  @Min(-180)
  @Max(180)
  longitude: number;

  @Field()
  @Min(-90)
  @Max(90)
  latitude: number;
}
type WeekdayType = `${Weekday}`;

@InputType()
export class OpeningHourInput {
  @Field(() => Weekday)
  day: Weekday;

  @Field()
  hours: string;
}

@InputType()
export class FoodInput {
  @Field({ nullable: true })
  description: String;

  @Field(() => Int)
  price: number;

  @Field()
  name: String;
}
@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field()
  city: string;

  @Field()
  location: LocationInput;

  @Field()
  address: string;

  @Field()
  rating: number;

  @Field(() => [FoodInput])
  foods: FoodInput[];

  @Field({ nullable: true })
  contact?: ContactInput;

  @Field(() => [OpeningHourInput], { nullable: true })
  openingHours?: OpeningHourInput[];
}
