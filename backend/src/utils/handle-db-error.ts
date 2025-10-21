import { QueryFailedError } from 'typeorm';

interface PostgresQueryFailedError extends QueryFailedError {
    driverError: {
        name: string;
        message: string;
        code?: string;
        detail?: string;
        constraint?: string;
    };
}

export function isPostgresError(
    error: unknown,
): error is PostgresQueryFailedError {
    return (
        error instanceof QueryFailedError &&
        typeof (error as PostgresQueryFailedError).driverError?.code ===
            'string'
    );
}
