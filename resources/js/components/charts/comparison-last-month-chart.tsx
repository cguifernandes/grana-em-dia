import { Bar } from "recharts";
import { ChartTooltipContent } from "../ui/chart";
import { ChartTooltip } from "../ui/chart";
import { BarChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ChartConfig } from "../ui/chart";
import { ChartContainer } from "../ui/chart";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/functions";

export type ComparisonLastMonth = {
    category: string;
    previous_month: {
        month: string;
        income: number;
        expense: number;
    };
    current_month: {
        month: string;
        income: number;
        expense: number;
    };
};

type ComparisonLastMonthProps = {
    data: ComparisonLastMonth[];
    className?: string;
    chartClassName?: string;
};

const ComparisonLastMonthChart = ({
    data,
    className,
    chartClassName,
}: ComparisonLastMonthProps) => {
    const first = data[0] || null;

    const chartConfig: ChartConfig = {
        previous_income: {
            label: first
                ? `Receitas de ${first.previous_month.month}`
                : "Receitas mês anterior",
            color: "var(--chart-1)",
        },
        previous_expense: {
            label: first
                ? `Despesas de ${first.previous_month.month}`
                : "Despesas mês anterior",
            color: "var(--chart-2)",
        },
        current_income: {
            label: first
                ? `Receitas de ${first.current_month.month}`
                : "Receitas mês atual",
            color: "var(--chart-3)",
        },
        current_expense: {
            label: first
                ? `Despesas de ${first.current_month.month}`
                : "Despesas mês atual",
            color: "var(--chart-4)",
        },
    };

    const parsedData = data.map((item) => ({
        category: item.category,
        previous_income: item.previous_month.income,
        previous_expense: item.previous_month.expense,
        current_income: item.current_month.income,
        current_expense: item.current_month.expense,
        previous_month_name: item.previous_month.month,
        current_month_name: item.current_month.month,
    }));

    return (
        <Card className={cn("gap-6 p-4 min-h-[300px]", className)}>
            <CardHeader className="px-0">
                <CardTitle>Comparativo com mês anterior</CardTitle>
                <CardDescription>
                    Compare suas receitas e despesas deste mês com o mês
                    anterior
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0 h-full">
                {data.length > 0 ? (
                    <ChartContainer
                        className={cn("max-h-[300px]", chartClassName)}
                        config={chartConfig}
                    >
                        <BarChart accessibilityLayer data={parsedData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name, item) => {
                                            const formatValue = formatCurrency(
                                                Number(value),
                                            );

                                            return (
                                                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-x-1">
                                                        <div
                                                            className={cn(
                                                                "shrink-0 rounded-[2px] h-2.5 w-2.5 border-(--color-border) bg-(--color-bg)",
                                                            )}
                                                            style={
                                                                {
                                                                    "--color-bg":
                                                                        item.color,
                                                                    "--color-border":
                                                                        item.color,
                                                                } as React.CSSProperties
                                                            }
                                                        />
                                                        {
                                                            chartConfig[
                                                                name as keyof typeof chartConfig
                                                            ]?.label
                                                        }
                                                    </div>
                                                    <span className="font-mono font-medium tabular-nums text-foreground">
                                                        {formatValue}
                                                    </span>
                                                </div>
                                            );
                                        }}
                                        className="w-60"
                                        indicator="dot"
                                    />
                                }
                            />
                            <Bar
                                dataKey="previous_income"
                                fill={chartConfig["previous_income"].color}
                                radius={4}
                            />
                            <Bar
                                dataKey="previous_expense"
                                fill={chartConfig["previous_expense"].color}
                                radius={4}
                            />
                            <Bar
                                dataKey="current_income"
                                fill={chartConfig["current_income"].color}
                                radius={4}
                            />
                            <Bar
                                dataKey="current_expense"
                                fill={chartConfig["current_expense"].color}
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm">
                            Nenhum dado disponível para exibição
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ComparisonLastMonthChart;
