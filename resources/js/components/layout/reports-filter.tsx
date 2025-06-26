import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

type ReportFiltersProps = {
    onFilterChange: (filters: { month: string; year: string }) => void;
};

const ReportsFilter = ({ onFilterChange }: ReportFiltersProps) => {
    const [month, setMonth] = useState(String(new Date().getMonth() + 1));
    const [year, setYear] = useState(String(new Date().getFullYear()));

    const handleMonthChange = (value: string) => {
        setMonth(value);
    };

    const handleYearChange = (value: string) => {
        setYear(value);
        const currentYear = new Date().getFullYear();

        if (value === currentYear.toString()) {
            setMonth(String(new Date().getMonth() + 1));
        }
    };

    const getAvailableMonths = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const months = Array.from({ length: 12 }, (_, i) => String(i + 1));

        if (year === currentYear.toString()) {
            return months.slice(0, currentMonth);
        }

        return months;
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

    const getMonthName = (monthNum: string) => {
        const months = [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ];

        return months[parseInt(monthNum, 10) - 1];
    };

    return (
        <Card className="gap-6 p-4">
            <CardContent className="px-0">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex gap-4 max-w-3xl w-full">
                        <Select value={month} onValueChange={handleMonthChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um mês" />
                            </SelectTrigger>
                            <SelectContent>
                                {getAvailableMonths().map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {getMonthName(m)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={year} onValueChange={handleYearChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione um ano" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="!mt-auto min-w-36"
                        onClick={() => onFilterChange({ month, year })}
                    >
                        Filtrar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportsFilter;
