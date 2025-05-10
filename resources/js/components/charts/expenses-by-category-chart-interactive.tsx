import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ChartContainer } from "../ui/chart";
import { Label, Pie, PieChart, Sector } from "recharts";
import { formatCurrency, generateChartConfig } from "@/utils/functions";
import CategoryCard from "../layout/category-card";
import { useState } from "react";
import { CategoryType } from "@/types/types";

export type CategoryExpense = {
	name: string;
	value: number;
	fill: string;
};

type ExpensesByCategoryChartInProps = {
	data: CategoryExpense[];
	className?: string;
	chartClassName?: string;
	categories: (Omit<CategoryType, "created_at" | "updated_at"> & {
		amount: number;
	})[];
};

const chartColors = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

const ExpensesByCategoryChartInteractive = ({
	data,
	className,
	chartClassName,
	categories,
}: ExpensesByCategoryChartInProps) => {
	const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
	const chartConfig = generateChartConfig(data, chartColors);

	return (
		<Card className={cn("gap-6 p-4", className)}>
			<CardHeader className="px-0">
				<CardTitle>Despesas por categoria</CardTitle>
				<CardDescription>
					Distribuição de gastos por categoria no mês atual
				</CardDescription>
			</CardHeader>

			<CardContent className="px-0">
				<ChartContainer
					config={chartConfig}
					className={cn("!m-auto aspect-square", chartClassName)}
				>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							onMouseEnter={({ payload }) =>
								setActiveIndex(
									data.findIndex((item) => item.name === payload.name),
								)
							}
							onMouseLeave={() => setActiveIndex(undefined)}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }) => (
								<Sector {...props} outerRadius={outerRadius + 7.5} />
							)}
							innerRadius={80}
						>
							<Label
								content={({ viewBox }) => {
									if (
										viewBox &&
										"cx" in viewBox &&
										"cy" in viewBox &&
										activeIndex !== undefined
									) {
										const activeItem = data[activeIndex];
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-xl font-medium"
												>
													{formatCurrency(activeItem.value)}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													{activeItem.name}
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="px-0">
				<div className="gap-2 grid w-full grid-cols-3">
					{categories.map((category) => (
						<CategoryCard
							id={category.id}
							key={category.id}
							amount={category.amount}
							name={category.name}
							color={category.color}
							icon={category.icon}
							onMouseEnter={() =>
								setActiveIndex(
									data.findIndex((item) => item.name === category.name),
								)
							}
							onMouseLeave={() => setActiveIndex(undefined)}
						/>
					))}
				</div>
			</CardFooter>
		</Card>
	);
};

export default ExpensesByCategoryChartInteractive;
