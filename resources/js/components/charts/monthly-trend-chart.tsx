import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { formatCurrency } from "@/utils/functions";

export type MonthlyTrend = {
    month: string;
    income: number;
    expense: number;
};

type MonthlyTrendChartProps = {
    data: MonthlyTrend[];
    className?: string;
    chartClassName?: string;
};

const chartConfig = {
    income: {
        label: "Renda",
        color: "var(--primary)",
    },
    expense: {
        label: "Despesas",
        color: "var(--destructive)",
    },
} satisfies ChartConfig;

const MonthlyTrendChart = ({
    className,
    chartClassName,
    data,
}: MonthlyTrendChartProps) => {
    return (
        <Card className={cn("gap-6 p-4 min-h-[300px]", className)}>
            <CardHeader className="px-0">
                <CardTitle>Tendências mensais</CardTitle>
                <CardDescription>
                    Veja como suas receitas e despesas variam nos últimos 6
                    meses.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0 h-full">
                {data.length > 0 ? (
                    <ChartContainer
                        className={cn("!m-auto max-h-[300px]", chartClassName)}
                        config={chartConfig}
                    >
                        <AreaChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={4}
                                tickFormatter={(value) => value.slice(0, 3)}
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
                                        className="w-48"
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="income"
                                type="natural"
                                fill="var(--color-income)"
                                fillOpacity={0.4}
                                stroke="var(--color-income)"
                                stackId="a"
                            />
                            <Area
                                dataKey="expense"
                                type="natural"
                                fill="var(--color-expense)"
                                fillOpacity={0.4}
                                stroke="var(--color-expense)"
                                stackId="b"
                            />
                        </AreaChart>
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

export default MonthlyTrendChart;
