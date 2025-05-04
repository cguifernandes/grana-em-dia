import {
	ArrowDownRight,
	DollarSign,
	Percent,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import BalanceCard from "../balance-card";
import MonthlyTrendChart, { MonthlyTrend } from "../charts/monthly-trend-chart";
import ExpensesByCategoryChart, {
	CategoryExpense,
} from "../charts/expenses-by-category-chart";
import TransactionList, { Transaction } from "./transaction-list";
import {
	ArrowUpRight,
	Home,
	ShoppingCart,
	Wifi,
	Briefcase,
} from "lucide-react";

const mockTransactions: Transaction[] = [
	{
		id: "1",
		description: "Salário",
		amount: 5000,
		category: "Salário",
		date: "2023-04-05",
		type: "income",
		icon: <ArrowUpRight size={18} />,
	},
	{
		id: "2",
		description: "Aluguel",
		amount: 1200,
		category: "Moradia",
		date: "2023-04-10",
		type: "expense",
		icon: <Home size={18} />,
	},
	{
		id: "3",
		description: "Supermercado",
		amount: 500,
		category: "Alimentação",
		date: "2023-04-15",
		type: "expense",
		icon: <ShoppingCart size={18} />,
	},
	{
		id: "4",
		description: "Internet",
		amount: 120,
		category: "Contas",
		date: "2023-04-20",
		type: "expense",
		icon: <Wifi size={18} />,
	},
	{
		id: "5",
		description: "Freelance",
		amount: 2000,
		category: "Renda Extra",
		date: "2023-04-25",
		type: "income",
		icon: <Briefcase size={18} />,
	},
];

const mockMonthlyTrends: MonthlyTrend[] = [
	{ month: "January", income: 4500, expense: 3000 },
	{ month: "February", income: 4200, expense: 3200 },
	{ month: "March", income: 5000, expense: 3100 },
	{ month: "April", income: 7000, expense: 2800 },
	{ month: "May", income: 6500, expense: 3300 },
	{ month: "June", income: 5800, expense: 3400 },
];

const mockCategoryExpenses: CategoryExpense[] = [
	{ name: "Moradia", value: 1200, fill: "var(--chart-1)" },
	{ name: "Alimentação", value: 500, fill: "var(--chart-2)" },
	{ name: "Contas", value: 120, fill: "var(--chart-3)" },
	{ name: "Transporte", value: 300, fill: "var(--chart-4)" },
	{ name: "Lazer", value: 200, fill: "var(--chart-5)" },
];

const Dashboard = () => {
	return (
		<div className="w-full bg-neutral-50 max-w-7xl pt-20 dark:bg-neutral-900 h-full flex flex-col gap-y-4 p-5">
			<h1 className="text-xl">Visão Geral</h1>

			<div className="flex gap-x-2">
				<BalanceCard
					icon={<DollarSign className="text-yellow-500" size={16} />}
					title="Saldo Total"
					className="flex-1"
					amount={1000}
					iconClassName="bg-yellow-500/20"
				/>
				<BalanceCard
					icon={<ArrowUpRight className="text-primary" size={16} />}
					title="Receitas"
					className="flex-1"
					amount={1000}
					iconClassName="bg-primary/20"
				/>
				<BalanceCard
					icon={<ArrowDownRight className="text-destructive" size={16} />}
					title="Despesas"
					className="flex-1"
					amount={1000}
					iconClassName="bg-destructive/20"
				/>
				<BalanceCard
					icon={<TrendingUp className="text-blue-500" size={16} />}
					title="Economia"
					className="flex-1"
					amount={72}
					isPercentage
					iconClassName="bg-blue-500/20"
				/>
			</div>

			<div className="flex gap-x-2">
				<MonthlyTrendChart className="flex-1" data={mockMonthlyTrends} />
				<ExpensesByCategoryChart
					className="flex-1"
					data={mockCategoryExpenses}
				/>
			</div>

			<TransactionList transactions={mockTransactions} />
		</div>
	);
};

export default Dashboard;
