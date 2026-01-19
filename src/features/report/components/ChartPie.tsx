import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useState } from "react";
import { useReportQuery } from "@/features/report/api/report.query";
import ReportCategoryItem from "@/features/report/components/ReportCategoryItem";
import { useCategoriesQuery } from "@/features/category/api/category.query";
import type { TotalAmountCategoryList } from "@/features/report/type";

const ChartPie = ({ year, month }: { year: number; month: number }) => {
  const { t } = useTranslation("common");
  const [type, setType] = useState("INCOME");
  const { data: report } = useReportQuery({
    year: year,
    month: month,
    type,
  });
  const { data: categories } = useCategoriesQuery({});
  const getCategory = useCallback(
    (id: number) => {
      return categories?.dataList?.find((item) => item.id === id);
    },
    [categories]
  );
  const chartData = useMemo(() => {
    if (!report?.totalAmountCategoryList || !categories?.dataList) return [];

    return report.totalAmountCategoryList.map(
      (item: TotalAmountCategoryList, index: number) => {
        const category = getCategory(item.categoryId);

        return {
          category: category?.name || "Unknown",
          visitors: item.totalAmount,
          fill: `var(--chart-${(index % 5) + 1})`,
        };
      }
    );
  }, [report, categories, getCategory]);
  const chartConfig = useMemo(() => {
    if (!report?.totalAmountCategoryList || !categories?.dataList)
      return {
        visitors: { label: "Amount" },
      };

    const dynamicConfig = report.totalAmountCategoryList.reduce(
      (
        acc: Record<string, { label: string; color?: string }>,
        item: TotalAmountCategoryList,
        index: number
      ) => {
        const category = getCategory(item.categoryId);
        const key = category?.name || `category-${item.categoryId}`;

        acc[key] = {
          label: category?.name || "Unknown",
          color: `var(--chart-${(index % 5) + 1})`,
        };

        return acc;
      },
      {
        visitors: { label: "Amount" },
      } as Record<string, { label: string; color?: string }>
    );

    return dynamicConfig;
  }, [report, categories, getCategory]);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 flex justify-between">
        <CardTitle>{t("common.category_analysis")}</CardTitle>
        <CardDescription>
          <Tabs defaultValue={type} className="my-2">
            <TabsList className="w-full mb-2">
              <TabsTrigger
                className="text-primary"
                value="INCOME"
                onClick={() => setType("INCOME")}
              >
                {t("common.income")}
              </TabsTrigger>
              <TabsTrigger
                className="text-destructive"
                value="EXPENSE"
                onClick={() => setType("EXPENSE")}
              >
                {t("common.expense")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                hideLabel
                formatter={(value, _name, item) => {
                  const category = item?.payload?.category;
                  return `${category}: ${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(Number(value))}`;
                }}
                />
              }
            />
            <Pie data={chartData} dataKey="visitors" nameKey="category" />
          </PieChart>
        </ChartContainer>
        <div className="space-y-3">
          {report?.totalAmountCategoryList?.map(
            (item: TotalAmountCategoryList) => (
              <ReportCategoryItem
                type={type}
                totalAmount={item.totalAmount}
                category={getCategory(item.categoryId)}
              />
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartPie;
