import { registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export interface Location {
  type: string;
  coordinates: number[];
}

@Schema()
export class RestaurantDocument extends Document {
  @Prop()
  name: String;

  @Prop()
  rating: number;
  @Prop()
  address: String;

  @Prop({ required: true })
  city: String;

  @Prop({
    type: {
      phone: String,
      email: String,
    },
  })
  contact: {
    phone: String;
    email: String;
  };

  @Prop([
    {
      type: {
        day: Number,
        hours: String,
      },
    },
  ])
  openingHours: {
    day: Number;
    hours: String;
  };

  @Prop([
    {
      name: String,
      description: String,
      price: String,
    },
  ])
  foods: {
    name: String;
    description: String;
    price: String;
  }[];

  @Prop({
    type: MongooseSchema.Types.Mixed,
    index: '2dsphere',
  })
  location: {
    latitude: number;
    longitude: number;
  };

}

export const RestaurantSchema =
  SchemaFactory.createForClass(RestaurantDocument);

RestaurantSchema.index({ location: '2dsphere' });
