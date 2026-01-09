import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { TypographyP } from "@/shared/components/common/TypographyP";
import { Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const AuthLayout = () => {
  const { t } = useTranslation("auth");
  return (
    <div className="flex flex-col justify-center px-10 mt-10">
      <div className="flex flex-col items-center gap-2 mb-4">
        <img src="/smart_finance.png" className="size-20" alt="" />
        <TypographyH1 text="Smart Finance" />
        <TypographyP text={t("auth.slogan")} />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
