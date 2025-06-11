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
import { useEffect, useState } from "react";
import { ApiResponse, CategoryType } from "@/types/types";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export type CategoryExpense = {
	name: string;
	value: number;
	fill: string;
};

type ExpensesByCategoryChartProps = {
	className?: string;
	chartClassName?: string;
	categories?: (Omit<CategoryType, "created_at" | "updated_at"> & {
		amount: number;
	})[];
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
	categories,
	interactive = false,
}: ExpensesByCategoryChartProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState<CategoryExpense[]>([])
	const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
	const chartConfig = generateChartConfig(data, chartColors);

	useEffect(() => {
		const currentDate = new Date();
		const month = currentDate.getMonth() + 1;

		fetch(`/finances/categories?month=${month}`).then(async (response) => {
			const data = await (response.json()) as ApiResponse<CategoryExpense[]>

			if (!response.ok || !data.success) {
				toast.error(data.message);

				return;
			}

			setData(data.data)
		}).catch((error) => {
			console.log("Erro ao buscar dados: " + error)
			toast.error("Erro ao buscar dados, por favor tente novamente mais tarde")
		}).finally(() => {
			setIsLoading(false)
		})
	}, [])

	const handleMouseEnter = (name: string) => {
		setActiveIndex(data.findIndex((item) => item.name === name));
	};

	const handleMouseLeave = () => {
		setActiveIndex(undefined);
	};

	return (
		<Card className={cn("gap-6 p-4 min-h-[250px]", className)}>
			<CardHeader className="px-0">
				<CardTitle>Despesas por categoria</CardTitle>
				<CardDescription>
					Distribuição de gastos por categoria no mês atual
				</CardDescription>
			</CardHeader>


			<CardContent className="px-0 h-full">
				{
					isLoading ? <Skeleton className="w-full h-full" /> : 
				<ChartContainer
					config={chartConfig}
					className={cn("!m-auto max-h-[300px]", chartClassName)}
				>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							onMouseEnter={({ payload }) => handleMouseEnter(payload.name)}
							onMouseLeave={handleMouseLeave}
							strokeWidth={5}
							activeIndex={activeIndex}
							activeShape={({ outerRadius = 0, ...props }) => (
								<Sector {...props} outerRadius={outerRadius + 7.5} />
							)}
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
																"--color-bg": item.payload.fill,
																"--color-border": item.payload.fill,
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
						{!interactive && (
							<ChartLegend
								content={<ChartLegendContent nameKey="name" />}
								className="-translate-y-2 hidden lg:flex flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
							/>
						)}
					</PieChart>
				</ChartContainer>
				}
			</CardContent>

			{interactive && (
				<CardFooter className="px-0">
					<div className="gap-2 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{categories?.map((category) => (
							<CategoryCard
								id={category.id}
								key={category.id}
								amount={category.amount}
								name={category.name}
								color={category.color}
								icon={category.icon}
								onMouseEnter={() => handleMouseEnter(category.name)}
								onMouseLeave={handleMouseLeave}
							/>
						))}
					</div>
				</CardFooter>
			)}
		</Card>
	);
};

export default ExpensesByCategoryChart;
