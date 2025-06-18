import BalanceCard from "@/components/layout/balance-card";
import ExpensesByCategoryChart from "@/components/charts/expenses-by-category-chart";
import MonthlyTrendChart from "@/components/charts/monthly-trend-chart";
import DashboardLayout from "@/components/layout/dashboard-layout";
import TransactionList from "@/components/layout/transaction-list";
import { Head, usePage } from "@inertiajs/react";
import {
    ArrowDownRight,
    ArrowUpRight,
    DollarSign,
    TrendingUp,
} from "lucide-react";
import { PageProps } from "@/types/types";
import { useEffect } from "react";
import { toast } from "sonner";

const Home = () => {
    const { dashboard, flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            <Head title="Home" />
            <DashboardLayout title="Dashboard">
                <div className="h-full flex flex-col gap-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
                        <BalanceCard
                            icon={
                                <DollarSign
                                    className="text-yellow-500"
                                    size={16}
                                />
                            }
                            title="Saldo Total"
                            className="flex-1"
                            amount={dashboard.summary.data.balance}
                            iconClassName="bg-yellow-500/20"
                            description="Valor total disponível"
                        />
                        <BalanceCard
                            icon={
                                <ArrowUpRight
                                    className="text-primary"
                                    size={16}
                                />
                            }
                            title="Receitas"
                            className="flex-1"
                            amount={dashboard.summary.data.income}
                            iconClassName="bg-primary/20"
                            description="Total de entradas financeiras do mês atual"
                        />
                        <BalanceCard
                            icon={
                                <ArrowDownRight
                                    className="text-destructive"
                                    size={16}
                                />
                            }
                            title="Despesas"
                            className="flex-1"
                            amount={dashboard.summary.data.expense}
                            iconClassName="bg-destructive/20"
                            description="Gastos e saídas financeiras do mês atual"
                        />
                        <BalanceCard
                            icon={
                                <TrendingUp
                                    className="text-blue-500"
                                    size={16}
                                />
                            }
                            title="Economia"
                            className="flex-1"
                            amount={dashboard.summary.data.savings_percent}
                            isPercentage
                            iconClassName="bg-blue-500/20"
                            description="Percentual em relação à receita total"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <MonthlyTrendChart
                            data={dashboard.trends.data}
                            className="flex-1"
                        />
                        <ExpensesByCategoryChart
                            data={dashboard.categories.data}
                            className="flex-1"
                        />
                    </div>

                    <TransactionList data={dashboard.transactions.data} />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Home;
