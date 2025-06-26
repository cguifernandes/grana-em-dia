import DashboardLayout from "@/components/layout/dashboard-layout";
import ReportsFilter from "@/components/layout/reports-filter";
import { Head, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import MonthlyAnalysis from "@/components/reports/monthly-analysis";
import Categories from "@/components/reports/categories";
import Transactions from "@/components/reports/transactions";

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
