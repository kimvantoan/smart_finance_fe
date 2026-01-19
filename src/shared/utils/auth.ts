export const useAuth = () => ({
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("accessToken");
        return !!token;
    }
});

export type AuthContext = ReturnType<typeof useAuth>;