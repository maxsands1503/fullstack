import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConstituentModule } from './constituent/constituent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Constituent } from './constituent/entities/constituent.entity';

@Module({
  imports: [
    ConstituentModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // In-memory mode
      entities: [Constituent],
      synchronize: true, // Auto-create tables (development only)
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
