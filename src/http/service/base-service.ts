import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestType } from './model';
import { HttpOptions } from './options';

export class HttpBaseService {
  constructor(private readonly axiosInstance: AxiosInstance) { }

  get<T>(url: string, opts?: HttpOptions): Promise<T> {
    return this.processRequest(url, RequestType.Get, null, opts);
  }

  post<T = void>(url: string, data?: any | undefined, opts?: HttpOptions): Promise<T> {
    return this.processRequest(url, RequestType.Post, data, opts);
  }

  put<T = void>(url: string, data?: any | undefined, opts?: HttpOptions): Promise<T> {
    return this.processRequest(url, RequestType.Put, data, opts);
  }

  delete<T = void>(url: string, data?: any | undefined, opts?: HttpOptions): Promise<T> {
    return this.processRequest(url, RequestType.Delete, data, opts);
  }

  private async processRequest<T>(
    u: string,
    m: RequestType,
    d?: any,
    opts: HttpOptions = new HttpOptions()
  ): Promise<T> {
    const headers = Object.assign({}, opts._headers);
    const requestConfig: AxiosRequestConfig = {
      headers,
      method: m,
      withCredentials: opts._withCredentials,
      responseType: opts._responseType,
      timeout: opts._timeout,
      data: d ?? undefined,
    };

    if (opts._cancelTokenSource) {
      requestConfig.cancelToken = opts._cancelTokenSource.token;
    }

    const response = await this.axiosInstance(u, requestConfig);
    const results = response.data as unknown as T;

    return results;
  }
}