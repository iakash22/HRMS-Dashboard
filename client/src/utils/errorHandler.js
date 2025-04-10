export const getErrorMessage = (error) => {
    if (!error) return "Something went wrong. Please try again.";

    // Axios error with response
    if (error.response) {
        const { data } = error.response;

        // If the response is a simple message
        if (typeof data === "string") return data;

        // If the message field exists
        if (data?.message) return data.message;

        // If validation errors exist (e.g., Express, Laravel, Django)
        if (data?.errors && typeof data.errors === "object") {
            const allErrors = Object.values(data.errors).flat();
            return allErrors[0] || "Please check your input.";
        }

        return "Request failed. Please try again.";
    }

    // No response from server (network error)
    if (error.request) {
        return "Unable to connect. Check your internet connection.";
    }

    // If error is a string
    if (typeof error === "string") return error;

    // Fallback for unknown errors
    return "Something went wrong. Try again later.";
};
