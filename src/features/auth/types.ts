interface LoginPayload {
    email: string;
    password: string;
}

interface RegisterPayload extends LoginPayload {
    username: string
}

interface verifyOtpPayload{
    email: string;
    otp: string
}

interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export type { LoginPayload ,RegisterPayload, verifyOtpPayload, ChangePasswordPayload };