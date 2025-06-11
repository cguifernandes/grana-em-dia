import BalanceCard from "@/components/layout/balance-card";
import ExpensesByCategoryChart, {
	CategoryExpense,
} from "@/components/charts/expenses-by-category-chart";
import MonthlyTrendChart, {
	MonthlyTrend,
} from "@/components/charts/monthly-trend-chart";
import DashboardLayout from "@/components/layout/dashboard-layout";
import TransactionList, {
	Transaction,
} from "@/components/layout/transaction-list";
import { Head, usePage } from "@inertiajs/react";
import {
	ArrowDownRight,
	ArrowUpRight,
	Briefcase,
	DollarSign,
	HomeIcon,
	ShoppingCart,
	TrendingUp,
	Wifi,
} from "lucide-react";
import { PageProps } from "@/types/types";

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
		icon: <HomeIcon size={18} />,
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

const mockCategoryExpenses: CategoryExpense[] = [
	{ name: "Moradia", value: 1200, fill: "var(--chart-1)" },
	{ name: "Alimentação", value: 500, fill: "var(--chart-2)" },
	{ name: "Contas", value: 120, fill: "var(--chart-3)" },
	{ name: "Transporte", value: 300, fill: "var(--chart-4)" },
	{ name: "Lazer", value: 200, fill: "var(--chart-5)" },
];

const Home = () => {
	const { finances } = usePage<PageProps>().props;

	return (
		<>
			<Head title="Home" />
			<DashboardLayout title="Dashboard">
				<div className="h-full flex flex-col gap-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
						<BalanceCard
							icon={<DollarSign className="text-yellow-500" size={16} />}
							title="Saldo Total"
							className="flex-1"
							amount={finances.balance}
							iconClassName="bg-yellow-500/20"
							description="Valor total disponível"
						/>
						<BalanceCard
							icon={<ArrowUpRight className="text-primary" size={16} />}
							title="Receitas"
							className="flex-1"
							amount={finances.income}
							iconClassName="bg-primary/20"
							description="Total de entradas financeiras do mês atual"
						/>
						<BalanceCard
							icon={<ArrowDownRight className="text-destructive" size={16} />}
							title="Despesas"
							className="flex-1"
							amount={finances.expense}
							iconClassName="bg-destructive/20"
							description="Gastos e saídas financeiras do mês atual"
						/>
						<BalanceCard
							icon={<TrendingUp className="text-blue-500" size={16} />}
							title="Economia"
							className="flex-1"
							amount={finances.savings_percent}
							isPercentage
							iconClassName="bg-blue-500/20"
							description="Percentual em relação à receita total"
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
						<MonthlyTrendChart className="flex-1" />
						<ExpensesByCategoryChart
							className="flex-1"
						/>
					</div>

					<TransactionList transactions={mockTransactions} />
				</div>
			</DashboardLayout>
		</>
	);
};

export default Home;
