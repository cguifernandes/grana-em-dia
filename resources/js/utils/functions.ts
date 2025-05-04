import { CategoryExpense } from "@/components/charts/expenses-by-category-chart";
import { ChartConfig } from "@/components/ui/chart";

export const getInitials = (name: string) => {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.substring(0, 2);
};

export const generateChartConfig = (
	data: CategoryExpense[],
	chartColors: string[],
) => {
	const config: ChartConfig = {};

	data.forEach((item, index) => {
		config[item.name] = {
			label: item.name,
			color: chartColors[index % chartColors.length],
		};
	});

	return config;
};
