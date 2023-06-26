import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            (error?.extensions?.exception as any)?.response?.message ||
            error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRoot('mongodb://localhost/restaurant'),
    RestaurantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
