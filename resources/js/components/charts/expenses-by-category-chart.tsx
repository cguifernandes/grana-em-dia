import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { Pie, PieChart, Sector } from "recharts";
import { formatCurrency, generateChartConfig } from "@/utils/functions";
import CategoryCard from "../layout/category-card";
import { useState } from "react";
import { CategoryType } from "@/types/types";

export type CategoryExpense = {
    name: string;
    value: number;
    fill: string;
    percentage: number
};

type ExpensesByCategoryChartProps = {
    className?: string;
    data: CategoryExpense[];
    chartClassName?: string;
    interactive?: boolean;
};

const chartColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

const ExpensesByCategoryChart = ({
    className,
    chartClassName,
    data,
    interactive = false,
}: ExpensesByCategoryChartProps) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
        undefined,
    );
    const chartConfig = generateChartConfig(data, chartColors);

    const handleMouseEnter = (name: string) => {
        setActiveIndex(data.findIndex((item) => item.name === name));
    };

    const handleMouseLeave = () => {
        setActiveIndex(undefined);
    };

    return (
        <Card className={cn("gap-6 p-4 min-h-[300px]", className)}>
            <CardHeader className="px-0">
                <CardTitle>Despesas por categoria</CardTitle>
                <CardDescription>
                    Distribuição de gastos por categoria no mês atual
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0 h-full">
                {data.length > 0 ? (
                    <ChartContainer
                        config={chartConfig}
                        className={cn("!m-auto max-h-[300px]", chartClassName)}
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                onMouseEnter={({ payload }) =>
                                    handleMouseEnter(payload.name)
                                }
                                onMouseLeave={handleMouseLeave}
                                strokeWidth={5}
                                activeIndex={activeIndex}
                                activeShape={({
                                    outerRadius = 0,
                                    ...props
                                }) => (
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 7.5}
                                    />
                                )}
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
                                                                        item
                                                                            .payload
                                                                            .fill,
                                                                    "--color-border":
                                                                        item
                                                                            .payload
                                                                            .fill,
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
                        </PieChart>
                    </ChartContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm">
                            Nenhum dado disponível para exibição
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="px-0">
                <div className="flex flex-wrap w-full gap-2">
                    {
                        data.map((categories) => (
                            <div key={categories.fill + categories.name} className="flex min-w-64 gap-2 py-2 px-3 flex-1 items-center rounded-sm bg-muted">
                                <div
                                    className="size-4 rounded-full shrink-0"
                                    style={{ backgroundColor: categories.fill }}
                                />

                                <div className="flex justify-between items-center w-full gap-4 min-w-0">
                                    <h2 className="truncate text-sm min-w-0">
                                    {categories.name}
                                    </h2>

                                    <div className="flex flex-col items-end text-right shrink-0">
                                    <h2 className="text-sm">{formatCurrency(categories.value)}</h2>
                                    <p className="text-xs text-muted-foreground">{categories.percentage}%</p>
                                    </div>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </CardFooter>
        </Card>
    );
};

export default ExpensesByCategoryChart;
