import { VerbEnum } from "../types/endpoint.type";
import { Request } from "../types/request.type";

export enum RequestKeysEnum {
    GetAllConstituents = 'GetAllConstituents',
    GetPagedConstituents = 'GetPagedConstituents',
    CreateConstituent = 'CreateConstituent',
    GetConstituentCsvByCreatedDate = 'GetConstituentCsvByCreatedDate'
}


export const requests: Request = 
{   GetAllConstituents:
    {
        url: '/constituent',
        verb: VerbEnum.GET,
        payload: null,
        urlParameters: null,
        isBlob: false
    },
    GetPagedConstituents: {
        url: '/constituent',
        verb: VerbEnum.GET,
        payload: null,
        urlParameters: null,
        isBlob: false
    },
    CreateConstituent:
    {
        url: '/constituent',
        verb: VerbEnum.POST,
        payload: null,
        urlParameters: null,
        isBlob: false
    },
    GetConstituentCsvByCreatedDate : {
        url: '/constituent/csv',
        verb: VerbEnum.GET,
        payload: null,
        urlParameters: null,
        isBlob: true
    }
}
