export const buildQs = (baseUrl: string, params?: any): string => {
    if (!params || Object.keys(params).length === 0) {
      return baseUrl;
    }
  
    const qs = Object.keys(params)
      .flatMap(key => {
        if (!params[key] && typeof params[key] !== 'boolean') {
          return null;
        }
  
        if (Array.isArray(params[key])) {
          return params[key].map((item: any) => `${key}=${item}`);
        }
  
        return `${key}=${params[key]}`;
      })
      .filter(Boolean)
      .join('&');
  
    return `${baseUrl}?${qs}`;
  };