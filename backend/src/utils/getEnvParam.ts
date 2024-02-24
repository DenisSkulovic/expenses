import dotenv from 'dotenv';
dotenv.config();

export const getEnvParam = (paramName: string, isMandatory: boolean = true): string => {
    const param = process.env[paramName];
    if (isMandatory && !param) {
        throw new Error(`${paramName} is a mandatory ENV param`);
    }
    return param || '';
}