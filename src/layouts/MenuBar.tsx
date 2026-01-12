import { TypographyP } from "@/shared/components/common/TypographyP";
import { Link } from "@tanstack/react-router";
import { BookText, Layers, ReceiptText, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const MenuBar = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex justify-around items-center w-full fixed bottom-0 left-0 border-t py-2 shadow-md">
      <Link to="/category">
        <div className="flex flex-col items-center">
          <Layers />
          <TypographyP text={t("common.home")} />
        </div>
      </Link>
      <Link to="/category">
        <div className="flex flex-col items-center">
          <BookText />
          <TypographyP text={t("common.category")} />
        </div>
      </Link>
      <Link to="/category">
        <div className="flex flex-col items-center">
          <ReceiptText />
          <TypographyP text={t("common.transaction")} />
        </div>
      </Link>
      <Link to="/category">
        <div className="flex flex-col items-center">
          <User />
          <TypographyP text={t("common.personal")} />
        </div>
      </Link>
    </div>
  );
};

export default MenuBar;
