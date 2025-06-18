import BalanceCard from "@/components/layout/balance-card";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ReportsFilter from "@/components/layout/reports-filter";
import { ArrowDownRight, PiggyBank, ShoppingCart, Wallet } from "lucide-react";
import { Head, usePage } from "@inertiajs/react";
import CategoryMonthlyComparisonChart, {
    MonthlyComparison,
} from "@/components/charts/category-monthly-comparison-chart";
import ComparisonLastMonthChart, {
    ComparisonLastMonth,
} from "@/components/charts/comparison-last-month-chart";
import ReportsVariations, {
    Variations,
} from "@/components/layout/reports-variations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpensesByCategoryChart, {
    CategoryExpense,
} from "@/components/charts/expenses-by-category-chart";
import TrendAnalysis, { TrendData } from "@/components/layout/trend-analysis";
import { CategoryType } from "@/types/types";
import { CategoryColors } from "@/utils/enums";
import TransactionList, {
    Transaction,
} from "@/components/layout/transaction-list";

const mockMonthlyComparison: MonthlyComparison[] = [
    { category: "Moradia", income: 1200, expense: 1100 },
    { category: "Alimentação", income: 500, expense: 600 },
    { category: "Contas", income: 300, expense: 350 },
    { category: "Transporte", income: 200, expense: 250 },
    { category: "Lazer", income: 400, expense: 200 },
    { category: "Saúde", income: 150, expense: 300 },
];

const mockCategoryExpenses: CategoryExpense[] = [
    { name: "Moradia", value: 1200, fill: "var(--chart-1)" },
    { name: "Alimentação", value: 500, fill: "var(--chart-2)" },
    { name: "Contas", value: 120, fill: "var(--chart-3)" },
    { name: "Transporte", value: 300, fill: "var(--chart-4)" },
    { name: "Lazer", value: 200, fill: "var(--chart-5)" },
    { name: "Saúde", value: 150, fill: "var(--chart-6)" },
];

const mockComparisonLastMonth: ComparisonLastMonth[] = [
    {
        category: "Moradia",
        lastMonth: { income: 1000, expense: 900 },
        currentMonth: { income: 1200, expense: 1100 },
    },
    {
        category: "Alimentação",
        lastMonth: { income: 400, expense: 500 },
        currentMonth: { income: 500, expense: 600 },
    },
    {
        category: "Contas",
        lastMonth: { income: 250, expense: 300 },
        currentMonth: { income: 300, expense: 350 },
    },
    {
        category: "Transporte",
        lastMonth: { income: 150, expense: 200 },
        currentMonth: { income: 200, expense: 250 },
    },
    {
        category: "Lazer",
        lastMonth: { income: 300, expense: 200 },
        currentMonth: { income: 400, expense: 200 },
    },
    {
        category: "Saúde",
        lastMonth: { income: 100, expense: 250 },
        currentMonth: { income: 150, expense: 300 },
    },
];

const mockVariations: Variations[] = [
    { category: "Moradia", difference: 100, positive: true },
    { category: "Alimentação", difference: 50, positive: false },
    { category: "Contas", difference: 20, positive: true },
];

const mockCategories: (Omit<CategoryType, "created_at" | "updated_at"> & {
    amount: number;
})[] = [
    {
        id: 1,
        name: "Moradia",
        icon: "Home",
        color: CategoryColors.Green,
        amount: 1200,
    },
    {
        id: 2,
        name: "Alimentação",
        icon: "ShoppingCart",
        color: CategoryColors.Blue,
        amount: 500,
    },
    {
        id: 3,
        name: "Contas",
        icon: "CreditCard",
        color: CategoryColors.Indigo,
        amount: 120,
    },
    {
        id: 4,
        name: "Transporte",
        icon: "Car",
        color: CategoryColors.Yellow,
        amount: 300,
    },
    {
        id: 5,
        name: "Lazer",
        icon: "Ticket",
        color: CategoryColors.Purple,
        amount: 200,
    },
    {
        id: 6,
        name: "Saúde",
        icon: "Heart",
        color: CategoryColors.Pink,
        amount: 150,
    },
];

const mockTransactions: Transaction[] = [
    {
        id: "1",
        description: "Salário",
        amount: 5000,
        category: { name: "Salário", icon: "ArrowUpRight" },
        date: "2023-04-05",
        type: "income",
    },
    {
        id: "2",
        description: "Aluguel",
        amount: 1200,
        category: { name: "Moradia", icon: "Home" },
        date: "2023-04-10",
        type: "expense",
    },
    {
        id: "3",
        description: "Supermercado",
        amount: 500,
        category: { name: "Alimentação", icon: "ShoppingCart" },
        date: "2023-04-15",
        type: "expense",
    },
    {
        id: "4",
        description: "Internet",
        amount: 120,
        category: { name: "Contas", icon: "CreditCard" },
        date: "2023-04-20",
        type: "expense",
    },
    {
        id: "5",
        description: "Freelance",
        amount: 2000,
        category: { name: "Renda Extra", icon: "Briefcase" },
        date: "2023-04-25",
        type: "income",
    },
    {
        id: "6",
        description: "Café",
        amount: 10,
        category: { name: "Alimentação", icon: "Coffee" },
        date: "2023-04-30",
        type: "expense",
    },
    {
        id: "7",
        description: "Pagamento de conta",
        amount: 100,
        category: { name: "Contas", icon: "CreditCard" },
        date: "2023-05-01",
        type: "expense",
    },
];

const mockTrendData: TrendData[] = [
    {
        id: 1,
        name: "Moradia",
        color: "#FF5733",
        values: [1080, 1140, 1200],
    },
    {
        id: 2,
        name: "Alimentação",
        color: "#33FF57",
        values: [500, 480, 510],
    },
    {
        id: 3,
        name: "Transporte",
        color: "#3357FF",
        values: [300, 320, 310],
    },
];

const Reports = () => {
    const url = usePage().url;
    const defaultTab = url.split("?")[1]?.split("=")[1] || "monthly";

    const handleFilterChange = (filters: { month: string; year: string }) => {
        console.log("Filters changed:", filters);
    };

    return (
        <>
            <Head title="Relatórios" />
            <DashboardLayout title="Relatórios">
                <div className="h-full flex flex-col gap-y-4">
                    <ReportsFilter onFilterChange={handleFilterChange} />

                    <Tabs defaultValue={defaultTab}>
                        <TabsList className="mb-6">
                            <TabsTrigger value="monthly">
                                Análise Mensal
                            </TabsTrigger>
                            <TabsTrigger value="categories">
                                Categorias
                            </TabsTrigger>
                            <TabsTrigger value="transactions">
                                Transações
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="monthly"
                            className="flex flex-col gap-y-2"
                        >
                            <div className="flex gap-x-2">
                                <BalanceCard
                                    description="Valor total disponível"
                                    icon={
                                        <ArrowDownRight
                                            className="text-red-500"
                                            size={16}
                                        />
                                    }
                                    title="Total de despesas"
                                    className="flex-1"
                                    amount={2320}
                                    iconClassName="bg-red-500/20"
                                />
                                <BalanceCard
                                    description="Categoria com maior gasto mensal"
                                    icon={
                                        <ShoppingCart
                                            className="text-indigo-500"
                                            size={16}
                                        />
                                    }
                                    title="Maior despesa"
                                    className="flex-1"
                                    text="Moradia"
                                    iconClassName="bg-indigo-500/20"
                                />
                                <BalanceCard
                                    description="Valor poupado no mês"
                                    icon={
                                        <PiggyBank
                                            className="text-lime-500"
                                            size={16}
                                        />
                                    }
                                    title="Economia mensal"
                                    className="flex-1"
                                    amount={800}
                                    iconClassName="bg-lime-500/20"
                                />
                                <BalanceCard
                                    description="Saldo disponível para gastos"
                                    icon={
                                        <Wallet
                                            className="text-purple-500"
                                            size={16}
                                        />
                                    }
                                    title="Orçamento restante"
                                    className="flex-1"
                                    amount={1680}
                                    iconClassName="bg-purple-500/20"
                                />
                            </div>

                            <div className="flex gap-x-2">
                                <CategoryMonthlyComparisonChart
                                    className="flex-1"
                                    data={mockMonthlyComparison}
                                />
                                <ComparisonLastMonthChart
                                    className="flex-1"
                                    data={mockComparisonLastMonth}
                                />
                            </div>

                            <ReportsVariations data={mockVariations} />
                        </TabsContent>

                        <TabsContent
                            value="categories"
                            className="flex flex-col gap-y-2"
                        >
                            <ExpensesByCategoryChart
                                className="flex-1"
                                data={mockCategoryExpenses}
                                chartClassName="max-h-[300px]"
                                categories={mockCategories}
                            />

                            <div className="flex gap-x-2">
                                <TrendAnalysis categories={mockTrendData} />
                            </div>
                        </TabsContent>

                        <TabsContent value="transactions">
                            <TransactionList
                                showAll
                                data={{
                                    transactions: mockTransactions,
                                    balance: 1000,
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Reports;
