let API_URL;
if (process.env.NODE_ENV === "production") {
    API_URL = "";
} else {
    API_URL = "http://localhost:8084/GreenAppWeb";
}

export const APP_URL = API_URL;


export const MODULE_RECYCLING = "Reciclaje";