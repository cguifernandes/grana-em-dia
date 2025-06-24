import { CategoryType } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency, renderIcon } from "@/utils/functions";

export type MonthlySummaryType = { 
	total_current_month: number;
	percent_change_from_last_month: number | null;
	most_spent_category: CategoryType & { value: number } | null;
	least_spent_category: CategoryType & { value: number } | null;
	average_per_category: number;
	average_per_day: number;
}

type MonthlySummaryProps = {
	data: MonthlySummaryType
}

const MonthlySummary = ({ data }: MonthlySummaryProps) => {
	return (
		<Card className="gap-6 p-4 flex-1">
			<CardHeader className="px-0">
				<CardTitle>Resumo do mês</CardTitle>
				<CardDescription>
					Estatísticas e comparações do período atual
				</CardDescription>
			</CardHeader>

			<CardContent className="px-0 flex flex-wrap gap-2">
				<div className="flex bg-muted items-center p-3 rounded-sm justify-between w-full">
					<div className="flex flex-col gap-y-2">
						<p className="text-sm leading-none text-muted-foreground">Total gasto este mês</p>
						<h1 className="text-xl font-medium leading-none">
							{formatCurrency(data.total_current_month)}
						</h1>
					</div>
					<div className="flex flex-col items-end gap-y-2">
						<h1
						className={`font-medium leading-none ${
							data.percent_change_from_last_month ?? 0 > 0
							? "text-destructive"
							: data.percent_change_from_last_month ?? 0 < 0
							? "text-primary-500"
							: "text-card-foreground"
						}`}
						>
						{(data.percent_change_from_last_month ?? 0).toFixed(2)}%
						</h1>
						<p className="text-sm leading-none text-muted-foreground">
						{data.percent_change_from_last_month ?? 0 > 0
							? "Aumento em relação ao mês passado"
							: data.percent_change_from_last_month ?? 0 < 0
							? "Redução em relação ao mês passado"
							: "Sem variação em relação ao mês passado"}
						</p>
					</div>
				</div>
				<div className="flex w-full gap-x-2">
					<div className="flex flex-1 bg-muted p-3 rounded-sm flex-col gap-y-2 w-full">
						<p className="text-sm leading-none text-muted-foreground">Categoria com maior gasto</p>
						{
							data.most_spent_category ? 
							<div className="flex flex-col gap-y-1">
								<div className="flex items-center gap-x-2">
									<h1 className="font-medium">
										{data.most_spent_category.name}
									</h1>
								</div>
								<p className="text-sm text-destructive">{formatCurrency(data.most_spent_category.value)}</p>
							</div>
							:
							<h1 className="font-medium leading-none">Sem nenhuma categoria</h1>
						}
					</div>
					<div className="flex flex-1 bg-muted p-3 rounded-sm flex-col gap-y-2 w-full">
						<p className="text-sm leading-none text-muted-foreground">Categoria com menor gasto</p>
						{
							data.least_spent_category ? 
							<div className="flex flex-col gap-y-1">
								<div className="flex items-center gap-x-2">
									<h1 className="font-medium">
										{data.least_spent_category.name}
									</h1>
								</div>
								<p className="text-sm text-primary">{formatCurrency(data.least_spent_category.value)}</p>
							</div>
							:
							<h1 className="font-medium leading-none">Sem nenhuma categoria</h1>
						}
					</div>
				</div>
				<div className="flex w-full gap-x-2">
					<div className="flex flex-1 bg-muted p-3 rounded-sm flex-col gap-y-2 w-full">
						<p className="text-sm leading-none text-muted-foreground">Média por categoria</p>
						{
							data.average_per_category ? 
							<h1 className="font-medium text-lg leading-none">
								{formatCurrency(data.average_per_category)}
							</h1>
							:
							<h1 className="font-medium leading-none">Sem nenhuma categoria</h1>
						}
					</div>
					<div className="flex flex-1 bg-muted p-3 rounded-sm flex-col gap-y-2 w-full">
						<p className="text-sm leading-none text-muted-foreground">Gasto médio/dia</p>
						{
							data.average_per_day ? 
							<h1 className="font-medium text-lg leading-none">
								{formatCurrency(data.average_per_day)}
							</h1>
							:
							<h1 className="font-medium leading-none">Sem nenhuma categoria</h1>
						}
					</div>
				</div>
			</CardContent>

		</Card>
	);
};

export default MonthlySummary;
