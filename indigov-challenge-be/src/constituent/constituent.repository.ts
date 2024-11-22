import { Injectable } from '@nestjs/common';
import { Constituent } from './entities/constituent.entity';
import ConstituentsSeed from 'src/Seed/constituent.data';
import { PagedRequest } from './models/paged-request.model';
import { PagedResponse } from './models/paged-response.model';
import * as dayjs from 'dayjs'


@Injectable()
export class ConstituentRepository {
    private readonly data: Constituent[] = ConstituentsSeed;

    findAndCount(req: PagedRequest): PagedResponse<Constituent[]> {
        // page 2 take ten 
        const start = (req.page - 1) * req.limit;
        const end = (req.page * req.limit);
        var response = {data:  this.data.slice(start, end), totalRecords: this.data.length}
    
        return response;
    }

    findAll(): Constituent[] {
        return this.data;
    }

    findOne(id: number): Constituent | undefined {
        return this.data.find(item => item.id === id);
    }

    findOneByEmail(email: string): Constituent | undefined {
        return this.data.find(item => item.emailAddress === email);
    }

    findByCreatedDate(date: Date): Constituent[] {
        // date comparison in JS is rough
        const filteredList = this.data.filter(item => this.compareDates(new Date(item.createdDate), new Date(date)));
        return filteredList;
    }

    save(constituent: Constituent): Constituent {
        if(this.findOneByEmail(constituent.emailAddress)) {
            return this.update(constituent.id, constituent);
        }
        
        if (!constituent.id) {
            constituent.id = this.data.length ? Math.max(...this.data.map(item => item.id)) + 1 : 1;
        }

        const todayAtMidnight = new Date(new Date().setHours(0,0,0,0));

        constituent.createdDate = todayAtMidnight;
        constituent.updatedDate = todayAtMidnight;
        this.data.push(constituent);
        return constituent;
    }

    update(id: number, updates: Partial<Constituent>): Constituent | undefined {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return undefined;

        this.data[index] = { ...this.data[index], ...updates };
        return this.data[index];
    }

    delete(id: number): boolean {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }

    private compareDates(date1: Date, date2: Date) {
        return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
    }
}