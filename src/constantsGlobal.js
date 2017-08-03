let API_URL;
if (process.env.NODE_ENV === "production") {
    API_URL = "";
} else {
    API_URL = "http://localhost:8084/GreenApp";
}

export const APP_URL = API_URL;