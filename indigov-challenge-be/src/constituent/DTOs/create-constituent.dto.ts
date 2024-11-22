import { ApiProperty } from "@nestjs/swagger";
import { PartyAffiliationEnum } from "../models/party-affiliation.enum";

export class CreateConstituentDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    address1: string;
    @ApiProperty()
    address2: string;
    @ApiProperty()
    state: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    county: string;
    @ApiProperty()
    zipCode: string;
    @ApiProperty()
    phoneNumber: string;
    @ApiProperty()
    dateOfBirth: Date;
    @ApiProperty()
    partyAffiliation: PartyAffiliationEnum
}