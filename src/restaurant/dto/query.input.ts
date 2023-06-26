import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class NearByInput {
  @Field()
  @Min(-180)
  @Max(180)
  longitude: number;

  @Field()
  @Min(-90)
  @Max(90)
  latitude: number;
}

@InputType()
export class QuerySearchInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  food?: string;

  @Field({ nullable: true })
  city?: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
