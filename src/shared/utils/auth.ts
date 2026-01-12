export const auth = {
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("accessToken");
        return !!token;
    }
}