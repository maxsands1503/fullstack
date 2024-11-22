import { Injectable } from '@nestjs/common';
import { ConstituentRepository } from './constituent.repository';
import { Constituent } from './entities/constituent.entity';
import { PagedRequest } from './models/paged-request.model';
import { PagedResponse } from './models/paged-response.model';
import { CreateConstituentDto } from './DTOs/create-constituent.dto';

@Injectable()
export class ConstituentService {

  constructor(private _repo: ConstituentRepository){}

  findAndCount(req: PagedRequest): PagedResponse<Constituent[]> {
    return this._repo.findAndCount(req);
  }

  create(createConstituentDto: CreateConstituentDto) {
    const constituent = new Constituent();
    constituent.name = `${createConstituentDto.firstName} ${createConstituentDto.lastName}`;  
    constituent.firstName = createConstituentDto.firstName;
    constituent.lastName = createConstituentDto.lastName;
    constituent.phoneNumber = createConstituentDto.phoneNumber;  
    constituent.emailAddress = createConstituentDto.email;  
    constituent.address1 = createConstituentDto.address1;  
    constituent.address2 = createConstituentDto.address2;  
    constituent.city = createConstituentDto.city;  
    constituent.state = createConstituentDto.state;  
    constituent.zipCode = createConstituentDto.zipCode;  
    constituent.county = createConstituentDto.county;  
    constituent.partyAffiliation = createConstituentDto.partyAffiliation;
    constituent.dateOfBirth = createConstituentDto.dateOfBirth;
    return this._repo.save(constituent)
  }

  findAll() {
    return this._repo.findAll();
  }

  findOne(id: number) {
    return this._repo.findOne(id);
  }

  update(id: number, updateConstituentDto: Constituent) {
    return this._repo.update(id, updateConstituentDto);
  }

  remove(id: number) {
    return this._repo.delete(id);
  }

  findByCreatedDate(date: Date) {
    return this._repo.findByCreatedDate(date);
  }

}
