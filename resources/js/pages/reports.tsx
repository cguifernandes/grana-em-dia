import DashboardLayout from "@/components/layout/dashboard-layout";
import ReportsFilter from "@/components/layout/reports-filter";
import { Head, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList, {
    Transaction,
} from "@/components/layout/transaction-list";
import { useState } from "react";
import MonthlyAnalysis from "@/components/reports/monthly-analysis";
import Categories from "@/components/reports/categories";
import Transactions from "@/components/reports/transactions";

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

const Reports = () => {
    const url = usePage().url;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const [month, setMonth] = useState<string>(currentMonth.toString());
    const [year, setYear] = useState<string>(currentYear.toString());
    const defaultTab = url.split("?")[1]?.split("=")[1] || "monthly";

    const handleFilterChange = (filters: { month: string; year: string }) => {
        setYear(filters.year);
        setMonth(filters.month);
    };

    return (
        <>
            <Head title="Relatórios" />
            <DashboardLayout title="Relatórios">
                <div className="h-full flex flex-col gap-y-4">
                    <>
                        <ReportsFilter onFilterChange={handleFilterChange} />

                        <Tabs className="flex-1" defaultValue={defaultTab}>
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
                                className="flex flex-1 flex-col gap-y-2"
                            >
                                <MonthlyAnalysis month={month} year={year} />
                            </TabsContent>

                            <TabsContent
                                value="categories"
                                className="flex flex-col gap-y-2"
                            >
                                <Categories month={month} year={year} />
                            </TabsContent>

                            <TabsContent value="transactions">
                                <Transactions month={month} year={year} />
                            </TabsContent>
                        </Tabs>
                    </>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Reports;
