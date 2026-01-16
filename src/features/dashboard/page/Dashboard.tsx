import { useReportQuery } from "@/features/report/api/report.query";
import ReportTransaction from "@/features/transaction/components/ReportTransaction";
import { TypographyH2 } from "@/shared/components/common/TypographyH2";
import { TypographyH3 } from "@/shared/components/common/TypographyH3";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import ChartLine from "../components/ChartLine";

function Dashboard() {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());
  const [month, setMonth] = useState<number>(Number(currentMonth));
  const { data: report } = useReportQuery({
    year: Number(currentYear),
    month: month,
    type: undefined,
  });
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="pb-2 border-b">
        <TypographyH2 text="Sarah Nguyen" />
      </div>
      <ScrollArea className="h-[calc(100vh-150px)]">
      <div className="space-y-2 my-5 ">
          <ReportTransaction type="BALANCE" amount={report?.totalBalance} />
          <div className="grid grid-cols-2 gap-2">
            <ReportTransaction type="INCOME" amount={report?.totalIncome} />
            <ReportTransaction type="EXPENSE" amount={report?.totalExpense} />
          </div>
        </div>
      <div className="space-y-2">
        <div className="grid grid-cols-2 items-center">
          <TypographyH3 text={t("common.spent_analysis")} />
          <Tabs defaultValue="month" className="justify-end flex">
            <TabsList className="w-full mb-2">
              <TabsTrigger value="month" onClick={() => setMonth(Number(currentMonth))}>
                {t("common.month")}
              </TabsTrigger>
              <TabsTrigger value="year" onClick={() => setMonth(0)}>
                {t("common.year")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ChartLine year={Number(currentYear)} month={month} />
      </div>
      </ScrollArea>
    </div>
  );
}

export default Dashboard;
