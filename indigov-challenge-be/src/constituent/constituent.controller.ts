import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { ConstituentService } from './constituent.service';
import { Constituent } from './entities/constituent.entity';
import { PagedRequest } from './models/paged-request.model';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateConstituentDto } from './DTOs/create-constituent.dto';
import { Response } from 'express';
import { Parser } from 'json2csv';

@ApiTags('constituents')
@Controller('constituent')
export class ConstituentController {
  constructor(private readonly constituentService: ConstituentService) {}

  @ApiOperation({ summary: 'Create a new constituent' })
  @ApiResponse({ status: 200, description: 'The created records' })
  @Post()
  create(@Body() createConstituentDto: CreateConstituentDto) {
    return this.constituentService.create(createConstituentDto);
  }

  @ApiOperation({ summary: 'Get a paged response of all Constituents' })
  @ApiResponse({ status: 200, description: 'page of the amount specified Constituents' })
  @Get('paged')
  findAndCount(@Query() page: PagedRequest) {
    return this.constituentService.findAndCount(page);
  }

  @ApiOperation({ summary: 'Get all constituents' })
  @ApiResponse({ status: 200, description: 'All of them returned at once' })
  @Get()
  findAll() {
    return this.constituentService.findAll();
  }

  @ApiOperation({ summary: 'Get Single by ID' })
  @ApiResponse({ status: 200, description: 'Single Consituent Returned' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.constituentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update partial' })
  @ApiResponse({ status: 200, description: 'Updated constituent' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConstituentDto: Constituent) {
    return this.constituentService.update(+id, updateConstituentDto);
  }

  @ApiOperation({ summary: 'Delete a consituent by ID' })
  @ApiResponse({ status: 200, description: 'returns a bool' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.constituentService.remove(+id);
  }


  // TODO would ultimately like this to call a filtered method that can do it on any field, but out of scope for now

  @ApiOperation({ summary: 'Get a all Constituents in a CSV' })
  @ApiResponse({ status: 200, description: 'returns a CSV' })
  @Get('csv/:date')
  downloadConstituentsCsv(@Param('date') date: Date, @Res() res: Response) {
    const data = this.constituentService.findByCreatedDate(date);

    const fields = [
      'id', 
      'name', 
      'phoneNumber', 
      'emailAddress', 
      'phoneNumberVerified',
      'emailVerified',
      'address1',
      'address2',
      'city',
      'state',
      'zipCode',
      'createdDate',
      'updatedDate'
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    // Set response headers for CSV download
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename="data.csv"');

    // Send CSV as the response
    res.send(csv);
  }

}
