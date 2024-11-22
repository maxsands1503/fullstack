import { Nullable } from "primereact/ts-helpers";
import { PartyAffiliationEnum } from "./party-affiliation.enum";

export type AddConstituentForm = {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    county: string;
    zipCode: string;
    phoneNumber: string;
    dateOfBirth: Nullable<Date>;
    partyAffiliation: Nullable<PartyAffiliationEnum>
}