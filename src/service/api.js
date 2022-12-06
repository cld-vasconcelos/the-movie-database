import config from "../config.js"

export async function apiGet(route, params) {
    const requestParams = [
        {
            key: "api_key",
            value: config.api.apiKey
        },
        {
            key: "language",
            value: "en-US"
        },
        ...params
    ];
    const url = `${config.api.baseUrl}${route}?${requestParams.map((param) => `${param.key}=${param.value}`).join("&")}`;
    return fetch(url, {
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
}