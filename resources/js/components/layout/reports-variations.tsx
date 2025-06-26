import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils/functions";

export type Variations = {
    category: string;
    difference: number;
    positive: boolean;
    current: number;
    previous: number;
};

type ReportsVariationsProps = {
    data: Variations[] | null;
};

const ReportsVariations = ({ data }: ReportsVariationsProps) => {
    return (
        <Card className="gap-6 p-4">
            <CardHeader className="px-0">
                <CardTitle>Variação de gastos por categoria</CardTitle>
                <CardDescription>
                    Acompanhe a diferença nos seus gastos em cada categoria em
                    relação ao mês anterior.
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
                {data && data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {data.map((variation) => (
                            <div
                                className={cn(
                                    "p-3 flex gap-2 border rounded-md",
                                    variation.positive
                                        ? "border-primary/20 bg-primary/10"
                                        : "border-destructive/20 bg-destructive/10",
                                )}
                                key={variation.category}
                            >
                                <div
                                    className={cn(
                                        "flex items-center rounded-md w-8 h-8 justify-center p-1.5",
                                        variation.positive
                                            ? "bg-primary/20"
                                            : "bg-destructive/20",
                                    )}
                                >
                                    {variation.positive ? (
                                        <ArrowUpRight
                                            className="text-primary"
                                            size={16}
                                        />
                                    ) : (
                                        <ArrowDownRight
                                            className="text-destructive"
                                            size={16}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <h3 className="text-sm leading-none font-medium">
                                        {variation.category}
                                    </h3>
                                    <p
                                        className={cn(
                                            "text-sm leading-none",
                                            variation.positive
                                                ? "text-primary"
                                                : "text-destructive",
                                        )}
                                    >
                                        {`${variation.positive ? "Aumento de" : "Redução de"} ${formatCurrency(
                                            variation.difference,
                                        )}`}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-center">
                        Sem variações por categoria
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export default ReportsVariations;
