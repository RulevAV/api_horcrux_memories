export function getCookie(name:string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function setResponseCookie(data :any){
    let dateToken = data.refreshTokenExpiration;
    document.cookie = `RefreshToken=${data.refreshToken}; expires=true`;
    document.cookie = `Token=${data.token}; expires=` + dateToken;
}

