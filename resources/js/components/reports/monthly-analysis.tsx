import BalanceCard from "@/components/layout/balance-card";
import { ArrowDownRight, PiggyBank, ShoppingCart, Wallet } from "lucide-react";
import { ApiResponse, MonthlyAnalysisType } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReportsVariations from "../layout/reports-variations";
import ComparisonLastMonthChart from "../charts/comparison-last-month-chart";
import CategoryMonthlyComparisonChart from "../charts/category-monthly-comparison-chart";
import { hexToRgba, renderIcon } from "@/utils/functions";

type MonthlyAnalysisProps = {
    year: string
    month: string
}

const MonthlyAnalysis = ({ month, year }: MonthlyAnalysisProps) => {
    const [monthlyAnalysis, setMonthlyAnalysis]  = useState<MonthlyAnalysisType | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true);
        setMonthlyAnalysis(null);

        fetch(`/reports/monthly-analysis?month=${month}&year=${year}`)
            .then(async (response) => {
                const data = await (response.json()) as ApiResponse<MonthlyAnalysisType>

                if (!response.ok || !data.success) {
                    toast.error(data.message);
                }

                setMonthlyAnalysis(data.data)
            })
            .catch((error: Error) => {
                console.log(error)
                toast.error("Ocorreu um erro ao buscar os dados");
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [year, month])

    if (isLoading || !monthlyAnalysis) {
        return (
            <div className="flex items-center justify-center w-full h-full">
                <div role="status">
                    <svg aria-hidden="true" className="w-12 h-12 text-neutral-200 animate-spin dark:text-neutral-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
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
                    amount={monthlyAnalysis.total_expense}
                    iconClassName="bg-red-500/20"
                />
                <BalanceCard
                    description="Categoria com maior gasto mensal"
                    icon={
                        monthlyAnalysis.top_category 
                        ? 
                            renderIcon(monthlyAnalysis.top_category.icon, 16, monthlyAnalysis.top_category.color)
                        :
                            <ShoppingCart
                                className="text-indigo-500"
                                size={16}
                            />
                    }
                    title="Maior despesa"
                    className="flex-1"
                    text={monthlyAnalysis.top_category ? monthlyAnalysis.top_category.name : "Sem Categoria"}
                    styleIcon={{
                        backgroundColor: monthlyAnalysis.top_category
                            ? `${hexToRgba(monthlyAnalysis.top_category.color, 0.2)}`
                            : "rgba(99, 102, 241, 0.2)", 
                    }}
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
                    amount={monthlyAnalysis.saving}
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
                    amount={monthlyAnalysis.balance}
                    iconClassName="bg-purple-500/20"
                />
            </div>

            <div className="flex gap-x-2">
                <CategoryMonthlyComparisonChart
                    className="flex-1"
                    data={monthlyAnalysis.category_comparison}
                />
                <ComparisonLastMonthChart
                    className="flex-1"
                    data={monthlyAnalysis.category_monthly_comparison}
                />
            </div>

            <ReportsVariations data={monthlyAnalysis.expense_variation_by_category} />
        </>
    );
};

export default MonthlyAnalysis;
