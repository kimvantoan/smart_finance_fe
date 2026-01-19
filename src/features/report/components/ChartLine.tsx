import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
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
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { useTranslation } from "react-i18next";
import { useLineChartQuery } from "@/features/report/api/report.query";

const chartConfig = {
  income: {
    label: "income",
    color: "var(--primary)",
  },
  expense: {
    label: "expense",
    color: "var(--destructive)",
  },
} satisfies ChartConfig;

const ChartLine = ({ year, month }: { year: number; month: number }) => {
  const { data: chartData } = useLineChartQuery({ year, month });

  const { t } = useTranslation("common");
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{t("common.flow_money")}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={1}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) => {
                    const map: Record<string, string> = {
                      income: t("common.income"),
                      expense: t("common.expense"),
                    };

                    return `${map[name] ?? name}: ${new Intl.NumberFormat(
                      "vi-VN"
                    ).format(Number(value))} ₫`;
                  }}
                />
              }
            />
            <Line
              dataKey="income"
              type="monotone"
              stroke="var(--color-income)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke="var(--color-expense)"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartLine;
