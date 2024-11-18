export class ApiError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}


export const guard = {
    badImplementation(message: string, statusCode: number = 500): never {
        throw new ApiError(message, statusCode);
    },
    notFound(message: string = 'Not Found'): never {
        throw new ApiError(message, 404);
    },
    internalServer(message: string = 'Internal Server Error'): never {
        throw new ApiError(message, 500);
    },
};

