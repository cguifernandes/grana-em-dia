import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { formatCurrency } from "@/utils/functions";
import { CSSProperties } from "react";

type BalanceCardProps = {
    title: string;
    amount?: number;
    className?: string;
    icon: React.ReactNode;
    iconClassName?: string;
    isPercentage?: boolean;
    text?: string;
    textClassName?: string;
    description: string;
    styleIcon?: CSSProperties;
};

const BalanceCard = ({
    amount,
    title,
    styleIcon,
    icon,
    className,
    iconClassName,
    text,
    isPercentage,
    description,
}: BalanceCardProps) => {
    const formattedAmount = isPercentage
        ? `${amount?.toFixed(1)}%`
        : formatCurrency(amount ?? 0);

    return (
        <Card className={cn("gap-2 p-4", className)}>
            <CardHeader className="pb-2 flex px-0 flex-row items-center justify-between">
                <CardTitle className="text-base">{title}</CardTitle>
                <div
                    style={styleIcon}
                    className={cn("p-1.5 rounded-md", iconClassName)}
                >
                    {icon}
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <h2 className={cn("text-3xl leading-none font-semibold")}>
                    {text ?? formattedAmount}
                </h2>
            </CardContent>
            <CardFooter className="px-0 pt-1">
                <span className="text-muted-foreground text-xs">
                    {description}
                </span>
            </CardFooter>
        </Card>
    );
};

export default BalanceCard;
