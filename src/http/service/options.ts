import { CancelTokenSource, ResponseType } from 'axios';

export class HttpOptions {
  _headers: { [header: string]: string };
  _withCredentials: boolean;
  _responseType: ResponseType;
  _timeout: number;
  _cancelTokenSource: CancelTokenSource|undefined;
  _isAuthRoute: boolean;
  _isStrictAuth: boolean|undefined;

  constructor() {
    this._withCredentials = false;
    this._isAuthRoute = false;
    this._responseType = 'json';
    this._timeout = 10000000;
    this._headers = {};
    this._cancelTokenSource=undefined;
    this._isStrictAuth = undefined;
  }

  withCredentials(flag: boolean): HttpOptions {
    this._withCredentials = flag;
    return this;
  }

  responseType(type: ResponseType): HttpOptions {
    this._responseType = type;
    return this;
  }

  asAuthRoute(params?: { strict?: boolean }) {
    this._isAuthRoute = true;
    this._isStrictAuth = params?.strict;
    return this;
  }

  timeout(n: number): HttpOptions {
    this._timeout = n;
    return this;
  }

  setHeader(name: string, value: string): HttpOptions {
    this._headers[name] = value;
    return this;
  }

  setCancelToken(source: CancelTokenSource): this {
    this._cancelTokenSource = source;
    return this;
  }
}