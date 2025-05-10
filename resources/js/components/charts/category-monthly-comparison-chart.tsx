import { ChartTooltip } from "../ui/chart";
import { ChartContainer, ChartTooltipContent } from "../ui/chart";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ChartConfig } from "../ui/chart";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { formatCurrency } from "@/utils/functions";

export type MonthlyComparison = {
	category: string;
	income: number;
	expense: number;
};

type CategoryMonthlyComparisonProps = {
	data: MonthlyComparison[];
	className?: string;
	chartClassName?: string;
};

const chartConfig = {
	income: {
		label: "Receitas",
		color: "var(--chart-1)",
	},
	expense: {
		label: "Despesas",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

const CategoryMonthlyComparisonChart = ({
	data,
	className,
	chartClassName,
}: CategoryMonthlyComparisonProps) => {
	return (
		<Card className={cn("gap-6 p-4", className)}>
			<CardHeader className="px-0">
				<CardTitle>Comparativo por categoria</CardTitle>
				<CardDescription>
					Análise comparativa entre receitas e despesas por categoria
				</CardDescription>
			</CardHeader>

			<CardContent className="px-0">
				<ChartContainer
					className={cn("max-h-[300px]", chartClassName)}
					config={chartConfig}
				>
					<BarChart accessibilityLayer data={data}>
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
										const formatValue = formatCurrency(Number(value));

										return (
											<div className="flex items-center justify-between w-full text-xs text-muted-foreground">
												<div className="flex items-center gap-x-1">
													<div
														className={cn(
															"shrink-0 rounded-[2px] h-2.5 w-2.5 border-(--color-border) bg-(--color-bg)",
														)}
														style={
															{
																"--color-bg": item.color,
																"--color-border": item.color,
															} as React.CSSProperties
														}
													/>
													{chartConfig[name as keyof typeof chartConfig]?.label}
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
						<Bar dataKey="income" fill="var(--color-income)" radius={4} />
						<Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default CategoryMonthlyComparisonChart;
