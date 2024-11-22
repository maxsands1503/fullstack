export type Endpoint = {
    url: string;
    verb: VerbEnum;
    payload: any | any[] | null;
    urlParameters: string | null;
    isBlob: boolean
}

export enum VerbEnum {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}