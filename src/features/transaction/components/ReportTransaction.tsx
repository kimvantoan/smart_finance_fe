import { TypographySmall } from "@/shared/components/common/TypographySmall";
import { formatNumber } from "@/shared/utils/formatNumber";
import { ArrowDown, ArrowUp, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportTransaction = ({
  type,
  amount,
}: {
  type: "INCOME" | "EXPENSE" | "BALANCE";
  amount: number;
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`space-y-1 p-3 rounded-2xl ${type === "INCOME" ? "border border-primary/15 bg-primary/10" : type === "EXPENSE" ? "border border-destructive/15 bg-destructive/10" : "border border-tertiary/15 bg-tertiary/10"}`}
    >
      <div className="flex gap-2 items-center">
        <div
          className={`flex items-center p-0.5 ${type === "INCOME" ? "bg-primary" : type === "EXPENSE" ? "bg-destructive" : "bg-tertiary"} rounded-full text-white`}
        >
          {type === "INCOME" ? <ArrowDown size={20} /> : type === "EXPENSE" ? <ArrowUp size={20} /> : <Landmark size={20} />}
        </div>
        <TypographySmall text={type === "INCOME" ? t("common.income") : type === "EXPENSE" ? t("common.expense") : t("common.revenue")} />
      </div>
      <b
        className={`${type === "INCOME" ? "text-primary" : type === "EXPENSE" ? "text-destructive" : "text-tertiary text-3xl"}`}
      >
        {type === "INCOME" ? "+" : type === "EXPENSE" ? "-" : ""}
        {formatNumber(amount) || 0} đ
      </b>
    </div>
  );
};

export default ReportTransaction;
