import config from "../config.js"

export async function ApiGet(route, params) {
    const requestParams = [
        {
            key: "api_key",
            value: "4ac15274164d3710a133b4a3023705c6"
        },
        {
            key: "language",
            value: "en-US"
        },
        ...params
    ];
    const url = `${config.api.baseUrl}${route}?${requestParams.join("&")}`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}