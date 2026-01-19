import ReportTransaction from "@/features/transaction/components/ReportTransaction";
import { TypographyH1 } from "@/shared/components/common/TypographyH1";
import { TypographyH3 } from "@/shared/components/common/TypographyH3";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReportQuery } from "../api/report.query";
import ChartLine from "@/features/report/components/ChartLine";
import ChartPie from "@/features/report/components/ChartPie";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

const Report = () => {
  const { t } = useTranslation("common");
  const [time, setTime] = useState("month");
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());
  const [month, setMonth] = useState<number>(Number(currentMonth));
  const [year, setYear] = useState(Number(currentYear));
  const { data: report } = useReportQuery({
    year: year,
    month: month,
    type: undefined,
  });

  const handleSetYear = () => {
    setMonth(0);
    setTime("year");
  };
  const handleSetMonth = () => {
    setMonth(Number(currentMonth));
    setTime("month");
  };
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

  const handleNextTime = () => {
    if (time === "year") {
      setYear(year + 1);
    } else {
      handleNextMonth();
    }
  };

  const handlePrevTime = () => {
    if (time === "year") {
      setYear(year - 1);
    } else {
      handlePrevMonth();
    }
  };
  return (
    <div className="space-y-2">
      <TypographyH1 text={t("common.report_financial")} />
      <Tabs defaultValue={time}>
        <TabsList className="w-full mb-2">
          <TabsTrigger value="month" onClick={handleSetMonth}>
            {t("common.month")}
          </TabsTrigger>
          <TabsTrigger value="year" onClick={handleSetYear}>
            {t("common.year")}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex items-center justify-between w-2/3 mx-auto mt-3 ">
        <Button onClick={handlePrevTime} variant={"ghost"} size={"icon"}>
          <ChevronLeft />
        </Button>
        <TypographyH3 text={`${month > 0 ? `${t("common.month")} ${month},` : ""} ${year}`} />
        <Button onClick={handleNextTime} variant={"ghost"} size={"icon"}>
          <ChevronRight />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-250px)] border-t">
        <div className="space-y-2 my-5 ">
          <ReportTransaction type="BALANCE" amount={report?.totalBalance} />
          <div className="grid grid-cols-2 gap-2">
            <ReportTransaction type="INCOME" amount={report?.totalIncome} />
            <ReportTransaction type="EXPENSE" amount={report?.totalExpense} />
          </div>
        </div>
        <div className="space-y-2">
          <ChartLine year={year} month={month} />
          <ChartPie month={month} year={year} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Report;
