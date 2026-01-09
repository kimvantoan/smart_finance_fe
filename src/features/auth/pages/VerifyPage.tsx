import { TypographyMuted } from "@/shared/components/common/TypographyMuted";
import { TypographyP } from "@/shared/components/common/TypographyP";
import { Button } from "@/shared/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useTranslation } from "react-i18next";
import { verifyRoute } from "../routes/verify.route";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../api/auth.mutation";
import { useEffect, useState } from "react";
import { Spinner } from "@/shared/components/ui/spinner";

const VerifyPage = () => {
  const { t } = useTranslation("auth");
  const mutationResend = useResendOtpMutation();
  const { email, expiredAt } = verifyRoute.useSearch();
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, expiredAt - Date.now());
  });
  const mutation = useVerifyOtpMutation();
  const [otp, setOtp] = useState("");

  // Update time left every second
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiredAt - Date.now();
      setTimeLeft(Math.max(0, diff));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredAt]);

  // Convert time left to seconds
  const seconds = Math.floor(timeLeft / 1000);

  // Handle verify button click
  const handleVerify = () => {
    mutation.mutate({ email, otp });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <TypographyMuted text={t("auth.otp_sent")} />
      <TypographyP text={email} />
      <InputOTP
        onChange={(value) => setOtp(value)}
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="flex items-center">
        <TypographyMuted text={t("auth.no_receive_otp")} />
        <Button
          onClick={() => mutationResend.mutate({ email })}
          disabled={seconds > 0}
          variant={"link"}
          className="p-1"
        >
          {t("auth.resend_otp") + (seconds > 0 ? ` (${seconds}s)` : "")}
          {mutationResend.isPending && <Spinner />}
          
        </Button>
      </div>
      <Button className="w-full" onClick={handleVerify}>
        {t("auth.verify_account")}
      </Button>
    </div>
  );
};

export default VerifyPage;
