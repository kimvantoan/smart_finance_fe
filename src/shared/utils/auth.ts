export const auth = {
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("access_token");
        return !!token;
    }
}