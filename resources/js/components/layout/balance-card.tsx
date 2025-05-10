import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/functions";

type BalanceCardProps = {
	title: string;
	amount?: number;
	className?: string;
	icon: React.ReactNode;
	iconClassName?: string;
	isPercentage?: boolean;
	text?: string;
	textClassName?: string;
};

const BalanceCard = ({
	amount,
	title,
	icon,
	className,
	iconClassName,
	text,
	isPercentage,
}: BalanceCardProps) => {
	const formattedAmount = isPercentage
		? `${amount?.toFixed(1)}%`
		: formatCurrency(amount ?? 0);

	return (
		<Card className={cn("gap-2 p-4", className)}>
			<CardHeader className="pb-2 flex px-0 flex-row items-center justify-between">
				<CardTitle className="text-base">{title}</CardTitle>
			</CardHeader>
			<CardContent className="px-0">
				<div className="flex justify-between items-center">
					<h2
						className={cn(
							"text-2xl leading-none font-semibold text-muted-foreground",
						)}
					>
						{text ?? formattedAmount}
					</h2>
					<div className={cn("p-1.5 rounded-md", iconClassName)}>{icon}</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default BalanceCard;
