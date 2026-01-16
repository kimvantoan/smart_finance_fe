import { formatNumber } from "@/shared/utils/formatNumber";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReportTransaction = ({
  type,
  amount,
}: {
  type: string;
  amount: number;
}) => {
  const { t } = useTranslation("common");
  return (
    <div
      className={`space-y-2 p-3 rounded-2xl ${type === "INCOME" ? "border border-primary/15 bg-primary/10" : "border border-destructive/15 bg-destructive/10"}`}
    >
      <div className="flex gap-2 items-center">
        <div
          className={`flex items-center p-1 ${type === "INCOME" ? "bg-primary" : "bg-destructive"} rounded-full text-white`}
        >
          {type === "INCOME" ? <ArrowDown size={20} /> : <ArrowUp size={20} />}
        </div>
        <b>{type === "INCOME" ? t("common.income") : t("common.expense")}</b>
      </div>
      <b
        className={`${type === "INCOME" ? "text-primary" : "text-destructive"} text-lg`}
      >
        {type === "INCOME" ? "+" : "-"}
        {formatNumber(amount)} đ
      </b>
    </div>
  );
};

export default ReportTransaction;
