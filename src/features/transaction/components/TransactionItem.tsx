import type { Category } from "@/features/category/type";
import type { Transaction } from "../type";
import { AppIcon } from "@/shared/hooks/AppIcon";
import { useNavigate } from "@tanstack/react-router";
import { formatNumber } from "@/shared/utils/formatNumber";
import { TypographyMuted } from "@/shared/components/common/TypographyMuted";

const TransactionItem = ({
  transaction,
  category,
}: {
  transaction: Transaction;
  category?: Category;
}) => {
  const navigate = useNavigate();
  if (!category) {
    return <div className="opacity-50 italic text-sm">Unknown category</div>;
  }
  return (
    <div
      onClick={() => {
        navigate({
          to: `/transaction/${transaction.id}/edit`,
        });
      }}
      className="flex items-center justify-between py-3 bg-white active:bg-gray-50 active:scale-[0.98] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <AppIcon name={category.iconKey}  />
        <div>
          <b>{category.name}</b>
          <TypographyMuted text={transaction.note || ""} />
        </div>
      </div>
      <b className={`${transaction.type === "INCOME" ? "text-primary" : "text-destructive"}`}>{transaction.type === "INCOME" ? "+" : "-"}{formatNumber(transaction.amount)} đ</b>
    </div>
  );
};

export default TransactionItem;
