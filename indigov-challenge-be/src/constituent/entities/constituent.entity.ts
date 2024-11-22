import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Constituent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @Column()
    emailAddress: string;

    @Column()
    phoneNumberVerified: boolean;

    @Column()
    emailVerified: boolean;

    @Column()
    address1: string;

    @Column()
    address2: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zipCode: string;

    @Column()
    county: string;
    // I would probably handle this differently if I weren't using online tools to spin up dumby data, so you will see strings of numbers, I would have done 
    // {StateFirstTwo}{DistrictNumber} like CO1 also probably generated from another service
    @Column()
    congressionalDistrict: string;

    @Column()
    isRegistered: boolean;

    // FK to some table with party info
    @Column()
    partyAffiliation: number;
    // I envision this value being updated by a different service
    @Column()
    hasDonated: boolean;

    @Column()
    dateOfBirth: Date;

    @Column()
    createdDate: Date;

    @Column()
    updatedDate: Date;
}