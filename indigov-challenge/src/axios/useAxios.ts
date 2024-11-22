import { useState } from "react";
import { Endpoint, VerbEnum } from "../types/endpoint.type";
import axiosInstance from "./axios";

export const useAxios = <T>(request: Endpoint, manual: boolean) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = async (): Promise<T | void> => {
        setLoading(true);
        setError(null);

        try {
            
            let response;
            const requestUrl = `${request.url}?${request.urlParameters ?? ''}`
            
            switch (request.verb) {
            case VerbEnum.GET:
                response = request.isBlob ? await axiosInstance.get<T>(requestUrl, { responseType: 'blob' }) : await axiosInstance.get<T>(requestUrl);        
            break;
            case VerbEnum.PATCH:
                response = await axiosInstance.patch<T>(request.url, request.payload);
            break;
            case VerbEnum.POST:
                response = await axiosInstance.post<T>(request.url, request.payload);
            break;
            case VerbEnum.DELETE:
                response = await axiosInstance.delete<T>(request.url);
            break;
            case VerbEnum.PUT:
                response = await axiosInstance.put<T>(request.url, request.payload);
            break;
            default:
                break;
            }
            setData(response?.data || null);
            return response?.data; 
        } catch (err: any) {
            setError(err.message);
            throw err; // Rethrow to allow error handling in the caller
        } finally {
            setLoading(false);
        }
    };

    // Automatically fetch if manual execution is not enabled
    if (!manual) {
        execute();
    }

    return { data, loading, error, execute };
}

