import { cn } from "@/lib/utils";
import { CategoryColors } from "@/utils/enums";
import { useState } from "react";

type SelectColorProps = {
    onSelect: (item: CategoryColors) => void;
    defaultValue?: CategoryColors | undefined;
};

const SelectColor = ({ onSelect, defaultValue }: SelectColorProps) => {
    const [selectedColor, setSelectedColor] = useState<CategoryColors>(
        defaultValue ?? CategoryColors.Indigo,
    );

    const handleSelectColor = (option: CategoryColors) => {
        setSelectedColor(option);
        onSelect(option);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {Object.values(CategoryColors).map((color) => (
                <div
                    key={color}
                    className={cn(
                        "w-8 h-8 rounded-full cursor-pointer",
                        selectedColor === color
                            ? "ring-2 ring-offset-1 ring-offset-background ring-primary"
                            : "opacity-30",
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSelectColor(color)}
                />
            ))}
        </div>
    );
};

export default SelectColor;
