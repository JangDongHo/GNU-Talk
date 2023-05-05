import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    ServeStaticModule.forRoot({
      serveRoot: '/client',
      rootPath: join(__dirname, '..', 'client'), // <-- path to the static files
    }),
    ConfigModule.forRoot({ envFilePath: '.env.dev' }), // Environment variables
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
