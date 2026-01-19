/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useState } from "react";
import { useTransactionQuery } from "../api/transaction.query";
import TransactionItem from "../components/TransactionItem";
import { useCategoriesQuery } from "@/features/category/api/category.query";
import { Separator } from "@/shared/components/ui/separator";
import { formatDateHeader } from "@/shared/utils/date";
import { useReportQuery } from "@/features/report/api/report.query";
import ReportTransaction from "../components/ReportTransaction";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { TypographyH3 } from "@/shared/components/common/TypographyH3";
const Transactions = () => {
  const { t } = useTranslation("transaction");
  const { t: m, i18n } = useTranslation("common");
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());
  const navigate = useNavigate();
  const [month, setMonth] = useState<number>(Number(currentMonth));
  const [year, setYear] = useState<number>(Number(currentYear));
  const [type, setType] = useState<string>();
  const { data } = useTransactionQuery({ type, month, year });
  const { data: categories } = useCategoriesQuery({});
  const { data: report } = useReportQuery({ year, month, type });
  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const getCategory = (id: number) => {
    const category = categories?.dataList?.find((item) => item.id === id);
    return category;
  };
  const grouped = data?.dataList?.reduce((acc: Record<string, any[]>, cur) => {
    const dateKey = cur.transactionDate;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(cur);
    return acc;
  }, {});
  return (
    <div>
      <div className="flex justify-between">
        <TypographyH1 text={t("transaction.transaction")} />
        <Button
          size={"icon-lg"}
          className="rounded-full"
          onClick={() =>
            navigate({
              to: "/transaction/add",
            })
          }
        >
          <Plus />
        </Button>
      </div>
      <div className="flex items-center justify-between w-2/3 mx-auto mt-3 ">
        <Button onClick={handlePrevMonth} variant={"ghost"} size={"icon"}>
          <ChevronLeft />
        </Button>
        <TypographyH3 text={`${month > 0 ? `${m("common.month")} ${month},` : ""} ${year}`} />
        <Button onClick={handleNextMonth} variant={"ghost"} size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
      <div className="space-y-2 my-5 ">
        <ReportTransaction type="BALANCE" amount={report?.totalBalance} />
        <div className="grid grid-cols-2 gap-2">
          <ReportTransaction type="INCOME" amount={report?.totalIncome} />
          <ReportTransaction type="EXPENSE" amount={report?.totalExpense} />
        </div>
      </div>

      {/* type  */}
      <Tabs defaultValue="" className="w-full mt-4">
        <TabsList className="w-full mb-2">
          <TabsTrigger value="" onClick={() => setType(undefined)}>
            {m("common.all")}
          </TabsTrigger>
          <TabsTrigger value="income" onClick={() => setType("INCOME")}>
            {m("common.income")}
          </TabsTrigger>
          <TabsTrigger value="expense" onClick={() => setType("EXPENSE")}>
            {m("common.expense")}
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-370px)]">
          {grouped &&
            Object.entries(grouped).map(([date, transactions]) => {
              const header = formatDateHeader(date,m,i18n.language);

              return (
                <div key={date} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase text-gray-800">
                      {header.label}
                    </p>
                    <p className="text-xs text-gray-400">{header.right}</p>
                  </div>
                  <Separator className="bg-gray-200" />
                  <div className="bg-white rounded-xl overflow-hidden">
                    {transactions.map((transaction, index) => (
                      <div key={transaction.id}>
                        <TransactionItem
                          transaction={transaction}
                          category={getCategory(transaction.categoryId)}
                        />
                        {index !== transactions.length - 1 && (
                          <Separator className="bg-gray-50" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default Transactions;
