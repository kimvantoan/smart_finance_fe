import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { TypographyH3 } from "@/shared/components/common/TypographyH3";
import { TypographyMuted } from "@/shared/components/common/TypographyMuted";
import { TypographySmall } from "@/shared/components/common/TypographySmall";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Globe, Lock, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

const Setting = () => {
  const { data } = useLoaderData({
    from: "/(app)/setting/",
    select: (data) => data.data,
  });
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  return (
    <div>
      <TypographyH1 text={t("common.setting")} />
      <div className="border rounded-xl p-3 flex flex-col items-center mb-4 mt-2">
        <TypographyH3 text={data.username} />
        <TypographyMuted text={data.email} />
      </div>
      <TypographySmall text={t("common.account").toUpperCase()} />
      <div className="border rounded-xl p-4 mb-4">
        <div onClick={() => navigate({ to: "/setting/change-password" })} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-yellow-100 w-fit">
              <Lock color="#F59E0B" />
            </div>
            <TypographySmall text={t("common.change_password")} />
          </div>
          <ChevronRight />
        </div>
      </div>
      <TypographySmall text={t("common.configure").toUpperCase()} />
      <div className="border rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 w-fit">
              <Globe color="#3B82F6" />
            </div>
            <TypographySmall text={t("common.change_language")} />
          </div>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger className="flex items-center gap-2">
                {i18n.language === "vi"
                  ? t("common.vietnamese")
                  : t("common.english")}{" "}
                <ChevronRight />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("common.change_language")}</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        i18n.changeLanguage("vi");
                        localStorage.setItem("lang", "vi");
                      }}
                      variant="outline"
                    >
                      {t("common.vietnamese")} {"🇻🇳"}
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        i18n.changeLanguage("en");
                        localStorage.setItem("lang", "en");
                      }}
                      variant="outline"
                    >
                      {t("common.english")} {"🇬🇧"}
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline"
        className="w-full border-destructive/40 text-destructive"
      >
        <LogOut /> <TypographySmall text={t("common.logout")} />
      </Button>
    </div>
  );
};

export default Setting;
