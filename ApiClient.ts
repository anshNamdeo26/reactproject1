//import cloneDeep from "lodash.clonedeep";

export interface ApiProps {
    webServiceUri?: string;
    jsonResponseHandler: (response: Response, value: any) => void;
    fetchErrorHandler: (error: Error) => void;
    handleError: (errorMessage: string) => void;
    headers: Headers;
}

namespace ApiClient {
    export function apiPromise(method: "delete" | "get" | "patch" | "post" | "put", uri: string, body: any,
        responseHandler: (response: Response) => void, errorHandler: (error: Error) => void, _headers: Headers = new Headers()): Promise<boolean> {
        let init: RequestInit = {
            mode: "cors",
            method: method
        };

        const headers = new Headers(_headers);

        if (body) {
            headers.append("Content-Type", "application/json");
            init = {
                ...init,
                body: JSON.stringify(body),
                headers: headers
            }
        } else {
            init = {
                ...init,
                headers: headers
            }
        }

        let isSuccess = false;
        return fetch(uri, init)
            .then((response: Response) => {
                if (response.ok) {
                    isSuccess = true;
                }

                responseHandler(response);
                return isSuccess;
            })
            .catch((error: Error) => {
                errorHandler(error);
                return false;
            });
    }

    export async function api(method: "delete" | "get" | "patch" | "post" | "put", uri: string, body: any,
        responseHandler: (response: Response) => void, errorHandler: (error: Error) => void, headers: Headers = new Headers()): Promise<boolean> {
        return await apiPromise(method, uri, body, responseHandler, errorHandler, headers);
    }
}

export default ApiClient;