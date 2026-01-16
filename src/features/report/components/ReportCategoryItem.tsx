import type { Category } from "@/features/category/type";
import { AppIcon } from "@/shared/hooks/AppIcon";
import { formatNumber } from "@/shared/utils/formatNumber";

const ReportCategoryItem = ({
  category,
  totalAmount,
  type,
}: {
  category: Category | undefined;
  totalAmount: number;
  type: string;
}) => {
  return (
    <div className="flex justify-between items-center" key={category?.id}>
      <div className="flex gap-2 items-center">
        <AppIcon name={category?.iconKey || "wallet"} />
        <b>{category?.name}</b>
      </div>
      <b className={`${type === "INCOME" ? "text-primary" : "text-destructive"}`}>
        {type === "INCOME" ? "+" : "-"}
        {formatNumber(totalAmount)} đ
      </b>
    </div>
  );
};

export default ReportCategoryItem;
