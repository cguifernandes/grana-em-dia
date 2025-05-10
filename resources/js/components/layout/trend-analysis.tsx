import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { formatCurrency } from "@/utils/functions";

export type TrendData = {
	id: number;
	name: string;
	color: string;
	values: number[];
};

type TrendAnalysisProps = {
	categories: TrendData[];
};

const calculatePercentageChange = (values: number[]) => {
	const [first, _, third] = values;
	const change = ((third - first) / first) * 100;
	return change.toFixed(2);
};

const TrendAnalysis = ({ categories }: TrendAnalysisProps) => {
	return (
		<Card className="gap-6 flex-1 p-4">
			<CardHeader className="px-0">
				<CardTitle>Análise de tendências</CardTitle>
				<CardDescription>
					Evolução de gastos por categoria nos últimos 3 meses
				</CardDescription>
			</CardHeader>

			<CardContent className="px-0 gap-4 flex flex-col">
				{categories.map((category) => (
					<div className="w-full flex flex-col gap-y-1" key={category.id}>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-x-2">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: category.color }}
								/>
								<h3 className="text-sm leading-none font-medium">
									{category.name}
								</h3>
							</div>
							<span className="text-sm text-muted-foreground">
								{calculatePercentageChange(category.values)}%
							</span>
						</div>
						<Progress
							indicatorColor={category.color}
							className="w-full"
							value={Number.parseInt(
								calculatePercentageChange(category.values),
							)}
						/>
						<div className="flex justify-between items-center">
							{category.values.map((value, index) => (
								<span className="text-sm text-muted-foreground" key={index}>
									{formatCurrency(value)}
								</span>
							))}
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default TrendAnalysis;
