let API_URL;
if (process.env.NODE_ENV === "production") {
    API_URL = "";
} else {
    API_URL = "http://localhost:8086/GreenAppWeb";
}

export const APP_URL = API_URL;


export const MODULE_RECYCLING = "Reciclaje";
export const VALUE_REQUIERED = "Debe ingresar un valor";
export const STATUS_SUCCESS = 200;
export const SUCCESS = 0;
export const FAILURE = -1;
export const HEIGTH_CONTROL_PANEL = 70;
export const MESSAGE_LOAD_DATA = "Cargando información";
export const MESSAGE_SAVE_DATA = "Guardando información";