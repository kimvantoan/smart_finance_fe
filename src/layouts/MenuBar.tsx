import { TypographySmall } from "@/shared/components/common/TypographySmall";
import { Link } from "@tanstack/react-router";
import { BookText, Layers, ReceiptText, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const MenuBar = () => {
  const { t } = useTranslation("common");
  const active = "text-primary";
  return (
    <div className="flex bg-white justify-around items-center w-full fixed bottom-0 left-0 py-4 shadow border-t">
      <Link to="/" activeProps={{ className: active }}>
        <div className="flex flex-col gap-2 items-center">
          <Layers />
          <TypographySmall text={t("common.home")} />
        </div>
      </Link>
      <Link to="/category" activeProps={{ className: active }}>
        <div className="flex flex-col items-center gap-2">
          <BookText />
          <TypographySmall text={t("common.category")} />
        </div>
      </Link>
      <Link to="/transaction" activeProps={{ className: active }}>
        <div className="flex flex-col items-center gap-2">
          <ReceiptText />
          <TypographySmall text={t("common.transaction")} />
        </div>
      </Link>
      <Link to="/category" activeProps={{ className: active }}>
        <div className="flex flex-col items-center gap-2">
          <User />
          <TypographySmall text={t("common.personal")} />
        </div>
      </Link>
    </div>
  );
};

export default MenuBar;
