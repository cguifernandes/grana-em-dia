import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

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
};

const TransactionList = ({ transactions, className }: TransactionListProps) => {
	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	return (
		<Card className={cn("gap-2 p-4", className)}>
			<CardHeader className="px-0">
				<CardTitle>Últimas transações</CardTitle>
				<CardDescription>Acompanhe seus gastos e receitas</CardDescription>
			</CardHeader>
			<CardContent className="px-0">
				<motion.div
					className="gap-y-2 flex flex-col pb-4"
					variants={container}
					initial="hidden"
					animate="show"
				>
					{transactions.map((transaction) => (
						<motion.div
							key={transaction.id}
							variants={item}
							className="flex items-center border border-border justify-between p-3 rounded-md hover:bg-muted transition-colors"
						>
							<div className="flex items-center gap-x-4">
								<div
									className={`p-2.5 rounded-md ${transaction.type === "income" ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}
								>
									{transaction.icon}
								</div>
								<div>
									<h3>{transaction.category}</h3>
									<div className="flex items-center text-sm gap-x-2">
										<span className="text-muted-foreground">
											{transaction.category}
										</span>
										<span className="text-muted-foreground">•</span>
										<span className="text-muted-foreground">
											{transaction.date}
										</span>
									</div>
								</div>
							</div>
							<div className="flex gap-x-2 items-center">
								<span
									className={cn(
										"font-medium",
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
										<ArrowDownRight className="text-primary" size={16} />
									</div>
								) : (
									<div className="p-1.5 rounded-md bg-destructive/20">
										<ArrowUpRight className="text-destructive" size={16} />
									</div>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>

				<div className="mt-6 pt-4 border-t border-border">
					<div className="flex justify-between items-center px-3">
						<span>Saldo</span>
						<span className="text-xl font-bold">R$ 12.000,50</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default TransactionList;
