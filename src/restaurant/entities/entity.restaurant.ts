import {
  InputType,
  Int,
  Field,
  ObjectType,
  Float,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, Max, Min } from 'class-validator';
export enum Weekday {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

registerEnumType(Weekday, {
  name: 'Weekday',
});

@ObjectType()
export class LocationType {
  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;
}

@ObjectType()
export class Contact {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;
}

@ObjectType()
export class OpeningHour {
  @Field(() => Weekday, { nullable: true })
  day: Weekday;

  @Field()
  hours: string;
}

@ObjectType()
export class Food {
  @Field({ nullable: true })
  description: String;

  @Field(() => Int)
  price: number;

  @Field()
  name: String;
}

@ObjectType()
export class Restaurant {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  distance: number;

  @Field(() => LocationType)
  location: {
    type: string;
    coordinates: number[];
  };

  @Field()
  address: string;

  @Field({ nullable: true })
  city: string;

  @Field()
  rating: number;

  @Field(() => [Food])
  foods: Food[];

  @Field({ nullable: true })
  contact?: Contact;

  @Field(() => [OpeningHour], { nullable: true })
  openingHours?: OpeningHour[];
}
