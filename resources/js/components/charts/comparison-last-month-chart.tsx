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
	lastMonth: {
		income: number;
		expense: number;
	};
	currentMonth: {
		income: number;
		expense: number;
	};
};

type ComparisonLastMonthProps = {
	data: ComparisonLastMonth[];
	className?: string;
	chartClassName?: string;
};

const chartConfig = {
	"lastMonth.income": {
		label: "Receitas de março",
		color: "var(--chart-1)",
	},
	"lastMonth.expense": {
		label: "Despesas de março",
		color: "var(--chart-2)",
	},
	"currentMonth.income": {
		label: "Receitas de abril",
		color: "var(--chart-3)",
	},
	"currentMonth.expense": {
		label: "Despesas de abril",
		color: "var(--chart-4)",
	},
} satisfies ChartConfig;

const ComparisonLastMonthChart = ({
	data,
	className,
	chartClassName,
}: ComparisonLastMonthProps) => {
	return (
		<Card className={cn("gap-6 p-4", className)}>
			<CardHeader className="px-0">
				<CardTitle>Comparativo com mês anterior</CardTitle>
				<CardDescription>
					Compare suas receitas e despesas deste mês com o mês anterior
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
									className="w-60"
									indicator="dot"
								/>
							}
						/>
						<Bar
							dataKey="lastMonth.income"
							fill={chartConfig["lastMonth.income"].color}
							radius={4}
						/>
						<Bar
							dataKey="lastMonth.expense"
							fill={chartConfig["lastMonth.expense"].color}
							radius={4}
						/>
						<Bar
							dataKey="currentMonth.income"
							fill={chartConfig["currentMonth.income"].color}
							radius={4}
						/>
						<Bar
							dataKey="currentMonth.expense"
							fill={chartConfig["currentMonth.expense"].color}
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ComparisonLastMonthChart;
