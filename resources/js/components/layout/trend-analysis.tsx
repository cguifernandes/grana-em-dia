import { useState } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { formatCurrency } from "@/utils/functions";

export type TrendData = {
    id: number;
    name: string;
    color: string;
    values: number[];
};

type TrendAnalysisProps = {
    categories: TrendData[];
};

const calculatePercentageChange = (values: number[]) => {
    const [first, , third] = values;

    if (first === 0) return "0.00";

    const change = ((third - first) / first) * 100;
    return change.toFixed(2);
};

const TrendAnalysis = ({ categories }: TrendAnalysisProps) => {
    const [showAll, setShowAll] = useState(false);

    const displayedCategories = showAll ? categories : categories.slice(0, 3);

    return (
        <Card className="gap-6 flex-1 p-4">
            <CardHeader className="px-0">
                <CardTitle>Análise de tendências</CardTitle>
                <CardDescription>
                    Evolução de gastos por categoria nos últimos 3 meses
                </CardDescription>
            </CardHeader>

            <CardContent className="px-0 gap-4 h-full flex flex-col">
                {displayedCategories.length > 0 ? (
                    displayedCategories.map((category) => (
                        <div
                            className="w-full flex flex-col gap-y-1"
                            key={category.id}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: category.color,
                                        }}
                                    />
                                    <h3 className="text-sm leading-none font-medium">
                                        {category.name}
                                    </h3>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {calculatePercentageChange(category.values)}
                                    %
                                </span>
                            </div>
                            <Progress
                                indicatorColor={category.color}
                                className="w-full"
                                value={Number.parseInt(
                                    calculatePercentageChange(category.values),
                                )}
                            />
                            <div className="flex justify-between items-center">
                                {category.values.map((value, index) => (
                                    <span
                                        className="text-sm text-muted-foreground"
                                        key={index}
                                        style={{
                                            flex: index !== 1 ? 1 : 0,
                                            textAlign:
                                                index === 2 ? "end" : "start",
                                        }}
                                    >
                                        {formatCurrency(value)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm">
                            Nenhum dado disponível para exibição
                        </p>
                    </div>
                )}

                {categories.length > 3 && (
                    <Button
                        variant="link"
                        size="sm"
                        className="w-fit !mx-auto"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Ver menos" : "Ver mais"}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default TrendAnalysis;
