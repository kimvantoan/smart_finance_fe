import { AppIcon } from "@/shared/hooks/AppIcon";
import type { Category } from "../type";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const CategoryItem = ({ category }: { category: Category }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("category");
  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return t("category.active");
      case "INACTIVE":
        return t("category.inactive");
      default:
        return "";
    }
  };
  const handleClick = () => {
    navigate({
      to: `/category/${category.id}/edit`,
    });
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-4 border rounded-4xl shadow bg-white active:scale-[0.98]"
    >
      <div className="space-y-2">
        <AppIcon name={category.iconKey} />
        <b>{category.name}</b>
      </div>
      <p className="text-sm text-gray-500">{getStatusText(category.status)}</p>
    </div>
  );
};

export default CategoryItem;
