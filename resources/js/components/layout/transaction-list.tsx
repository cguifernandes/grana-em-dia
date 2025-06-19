import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import { Link } from "@inertiajs/react";
import { renderIcon } from "@/utils/functions";

export type Transaction = {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: {
        name: string;
        icon: string;
    };
    type: "income" | "expense";
};

type TransactionListProps = {
    data: {
        transactions: Transaction[];
        balance: number;
    };
    className?: string;
    showAll?: boolean;
};

const ITEMS_PER_PAGE = 6;

const TransactionList = ({
    data,
    className,
    showAll = false,
}: TransactionListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.transactions.length / ITEMS_PER_PAGE);

    const displayedTransactions = showAll
        ? data.transactions.slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE,
          )
        : data.transactions.slice(0, ITEMS_PER_PAGE);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <Card className={cn("gap-4 p-4", className)}>
            <CardHeader className="px-0">
                <div className="flex  justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-y-1">
                        <CardTitle>Últimas transações</CardTitle>
                        <CardDescription>
                            Acompanhe seus gastos e receitas
                        </CardDescription>
                    </div>
                    {!showAll && (
                        <Button variant="link" size="sm">
                            <Link
                                href={route("reports", { tab: "transactions" })}
                            >
                                Ver todas
                            </Link>
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <div className="gap-y-2 flex flex-col">
                    {displayedTransactions.length > 0 ? (
                        displayedTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center border border-border justify-between p-3 rounded-md hover:bg-muted transition-colors gap-3 sm:gap-4"
                            >
                                <div className="flex items-center gap-x-4 w-full sm:w-auto">
                                    <div
                                        className={cn(
                                            "p-2.5 rounded-md shrink-0",
                                            transaction.type === "income"
                                                ? "bg-primary/20 text-primary"
                                                : "bg-destructive/20 text-destructive",
                                        )}
                                    >
                                        {renderIcon(transaction.category.icon)}
                                    </div>
                                    <div className="flex flex-col gap-y-1 min-w-0">
                                        <h3 className="leading-none font-medium truncate">
                                            {transaction.description}
                                        </h3>
                                        <div className="flex items-center text-sm gap-x-2 flex-wrap">
                                            <span className="text-muted-foreground leading-none">
                                                {transaction.category.name}
                                            </span>
                                            <span className="text-muted-foreground leading-none">
                                                •
                                            </span>
                                            <span className="text-muted-foreground leading-none">
                                                {transaction.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 items-center w-full sm:w-auto justify-between sm:justify-end">
                                    <span
                                        className={cn(
                                            "leading-none font-medium",
                                            transaction.type === "income"
                                                ? "text-primary"
                                                : "text-destructive",
                                        )}
                                    >
                                        {transaction.type === "income"
                                            ? "+"
                                            : "-"}
                                        R${" "}
                                        {transaction.amount.toLocaleString(
                                            "pt-BR",
                                            {
                                                minimumFractionDigits: 2,
                                            },
                                        )}
                                    </span>

                                    {transaction.type === "income" ? (
                                        <div className="p-1.5 rounded-md bg-primary/20">
                                            <ArrowUpRight
                                                className="text-primary"
                                                size={16}
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-1.5 rounded-md bg-destructive/20">
                                            <ArrowDownRight
                                                className="text-destructive"
                                                size={16}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-sm">
                                Nenhuma transação encontrada
                            </p>
                        </div>
                    )}
                </div>

                {showAll && totalPages > 1 && (
                    <Pagination className="py-4">
                        <PaginationContent>
                            <PaginationPrevious
                                onClick={() => {
                                    if (currentPage > 1) handlePreviousPage();
                                }}
                            />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationNext
                                onClick={() => {
                                    if (currentPage < totalPages)
                                        handleNextPage();
                                }}
                            />
                        </PaginationContent>
                    </Pagination>
                )}

                <div
                    className={cn(
                        "flex justify-between items-center p-3 border border-border rounded-md",
                        !showAll && "!mt-4",
                    )}
                >
                    <span>Saldo</span>
                    <span className="text-xl leading-none font-medium">
                        R${" "}
                        {data.balance.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                        })}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionList;
