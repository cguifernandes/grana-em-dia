import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type BalanceCardProps = {
	title: string;
	amount: number;
	className?: string;
	icon: React.ReactNode;
	iconClassName?: string;
	isPercentage?: boolean;
};

const BalanceCard = ({
	amount,
	title,
	icon,
	className,
	iconClassName,
	isPercentage,
}: BalanceCardProps) => {
	const formattedAmount = isPercentage
		? `${amount.toFixed(1)}%`
		: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(amount);

	return (
		<Card className={cn("gap-2 p-4", className)}>
			<CardHeader className="pb-2 flex px-0 flex-row items-center justify-between">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<div className="flex justify-between items-center">
					<h2 className={cn("text-2xl font-semibold text-muted-foreground")}>
						{formattedAmount}
					</h2>
					<div className={cn("p-1.5 rounded-md", iconClassName)}>{icon}</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BalanceCard;
