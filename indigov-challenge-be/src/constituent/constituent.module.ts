import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituentService } from './constituent.service';
import { ConstituentController } from './constituent.controller';
import { Constituent } from './entities/constituent.entity';
import { ConstituentRepository } from './constituent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Constituent])],
  controllers: [ConstituentController],
  providers: [ConstituentService, ConstituentRepository],
})
export class ConstituentModule {}
