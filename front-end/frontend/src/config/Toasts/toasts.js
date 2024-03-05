import toast from "react-hot-toast";

export async function successToast(message = null, duration = 3000, position = "top-right") {
    new Audio("/assets/sounds/success.mp3").play();
    toast.success(message, {
        duration, position
    });
}


export function errorToast(message = null, duration = 6000, position = "top-right") {
    new Audio("/assets/sounds/error.mp3").play();
    toast.error(message, {
        duration, position
    });
}