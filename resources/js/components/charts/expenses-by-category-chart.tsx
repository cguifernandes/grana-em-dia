import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { formatCurrency, generateChartConfig } from "@/utils/functions";

export type CategoryExpense = {
	name: string;
	value: number;
	fill: string;
};

type ExpensesByCategoryChartProps = {
	data: CategoryExpense[];
	className?: string;
	chartClassName?: string;
};

const chartColors = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

const ExpensesByCategoryChart = ({
	data,
	className,
	chartClassName,
}: ExpensesByCategoryChartProps) => {
	const chartConfig = generateChartConfig(data, chartColors);

	return (
		<Card className={cn("gap-6 p-4", className)}>
			<CardHeader className="px-0">
				<CardTitle>Despesas por categoria</CardTitle>
				<CardDescription>
					Entenda onde seu dinheiro está sendo gasto.
				</CardDescription>
			</CardHeader>

			<CardContent className="px-0">
				<ChartContainer
					config={chartConfig}
					className={cn("!m-auto aspect-square", chartClassName)}
				>
					<RadialBarChart
						data={data.map((item) => ({
							...item,
							visitors: item.value,
							browser: item.name,
						}))}
						startAngle={-90}
						endAngle={380}
						innerRadius={30}
						outerRadius={110}
					>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									className="w-56"
									formatter={(value, _, item) => {
										const formatValue = formatCurrency(Number(value));

										return (
											<div className="flex items-center justify-between w-full text-xs text-muted-foreground">
												<div className="flex items-center gap-x-1">
													<div
														className="shrink-0 rounded-[2px] h-2.5 w-2.5 border"
														style={{
															backgroundColor: item.payload.fill,
															borderColor: item.payload.fill,
														}}
													/>
													{item.payload.name}
												</div>
												<span className="font-mono font-medium tabular-nums text-foreground">
													{formatValue}
												</span>
											</div>
										);
									}}
									hideLabel
									nameKey="browser"
								/>
							}
						/>
						<RadialBar dataKey="visitors" background>
							<LabelList
								position="insideStart"
								dataKey="browser"
								className="fill-white capitalize mix-blend-luminosity"
								fontSize={11}
							/>
						</RadialBar>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};

export default ExpensesByCategoryChart;
