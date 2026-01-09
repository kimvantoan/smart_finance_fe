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

export type { LoginPayload ,RegisterPayload, verifyOtpPayload};