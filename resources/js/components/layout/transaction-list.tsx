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

export type Transaction = {
	id: string;
	description: string;
	amount: number;
	category: string;
	date: string;
	type: "income" | "expense";
	icon: React.ReactNode;
};

type TransactionListProps = {
	transactions: Transaction[];
	className?: string;
	showAll?: boolean;
};

const ITEMS_PER_PAGE = 6;

const TransactionList = ({
	transactions,
	className,
	showAll = false,
}: TransactionListProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

	const displayedTransactions = showAll
		? transactions.slice(
				(currentPage - 1) * ITEMS_PER_PAGE,
				currentPage * ITEMS_PER_PAGE,
			)
		: transactions.slice(0, ITEMS_PER_PAGE);

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
				<div className="flex justify-between items-center">
					<div className="flex flex-col gap-y-1">
						<CardTitle>Últimas transações</CardTitle>
						<CardDescription>Acompanhe seus gastos e receitas</CardDescription>
					</div>
					{!showAll && (
						<Button variant="link" size="sm">
							<Link href={route("reports", { tab: "transactions" })}>
								Ver todas
							</Link>
						</Button>
					)}
				</div>
			</CardHeader>
			<CardContent className="px-0">
				<div className="gap-y-2 flex flex-col pb-4">
					{displayedTransactions.map((transaction) => (
						<div
							key={transaction.id}
							className="flex items-center border border-border justify-between p-3 rounded-md hover:bg-muted transition-colors"
						>
							<div className="flex items-center gap-x-4">
								<div
									className={cn(
										"p-2.5 rounded-md",
										transaction.type === "income"
											? "bg-primary/20 text-primary"
											: "bg-destructive/20 text-destructive",
									)}
								>
									{transaction.icon}
								</div>
								<div className="flex flex-col gap-y-1">
									<h3 className="leading-none font-medium">
										{transaction.category}
									</h3>
									<div className="flex items-center text-sm gap-x-2">
										<span className="text-muted-foreground leading-none">
											{transaction.category}
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
							<div className="flex gap-x-2 items-center">
								<span
									className={cn(
										"leading-none font-medium",
										transaction.type === "income"
											? "text-primary"
											: "text-destructive",
									)}
								>
									{transaction.type === "income" ? "+" : "-"}R${" "}
									{transaction.amount.toLocaleString("pt-BR", {
										minimumFractionDigits: 2,
									})}
								</span>

								{transaction.type === "income" ? (
									<div className="p-1.5 rounded-md bg-primary/20">
										<ArrowUpRight className="text-primary" size={16} />
									</div>
								) : (
									<div className="p-1.5 rounded-md bg-destructive/20">
										<ArrowDownRight className="text-destructive" size={16} />
									</div>
								)}
							</div>
						</div>
					))}
				</div>

				{showAll && totalPages > 1 && (
					<Pagination>
						<PaginationContent>
							<PaginationPrevious
								onClick={() => {
									if (currentPage > 1) handlePreviousPage();
								}}
							/>
							{Array.from({ length: totalPages }, (_, index) => (
								<PaginationItem key={index}>
									<PaginationLink
										onClick={() => setCurrentPage(index + 1)}
										isActive={currentPage === index + 1}
									>
										{index + 1}
									</PaginationLink>
								</PaginationItem>
							))}
							<PaginationNext
								onClick={() => {
									if (currentPage < totalPages) handleNextPage();
								}}
							/>
						</PaginationContent>
					</Pagination>
				)}

				<div className="pt-4">
					<div className="flex justify-between items-center p-3 border border-border rounded-md">
						<span>Saldo</span>
						<span className="text-xl leading-none font-medium">
							R$ 12.000,50
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TransactionList;
