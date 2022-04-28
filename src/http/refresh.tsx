import { refreshTokenApi } from "./endpoints/user";

export const refresh = async  <T extends unknown>(fn: () => Promise<T>) => {
    try {
        const response = await fn();
        return response;
    } catch (error:any) {
        await refreshTokenApi();
        const response = await fn();
        return response;
    }
}
