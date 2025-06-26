import { cn } from "@/lib/utils";
import { CategoryIconsType } from "@/types/types";
import { categoryIcons, renderIcon } from "@/utils/functions";
import { useState } from "react";

type SelectIconProps = {
    onSelect: (item: CategoryIconsType) => void;
    defaultValue?: CategoryIconsType["value"];
};

const SelectIcon = ({ onSelect, defaultValue }: SelectIconProps) => {
    const [selectedIcon, setSelectedIcon] = useState<
        CategoryIconsType["value"]
    >(defaultValue ?? "ShoppingCart");

    const handleSelectIcon = (option: CategoryIconsType) => {
        setSelectedIcon(option.value);
        onSelect(option);
    };

    return (
        <div className="grid grid-cols-4 gap-2">
            {categoryIcons.map((option) => (
                <div
                    key={option.value}
                    className={cn(
                        "flex flex-col gap-y-1 items-center justify-center p-2 rounded-md cursor-pointer hover:bg-muted h-16",
                        selectedIcon === option.value
                            ? "border-primary bg-transparent border-2"
                            : "border-border border",
                    )}
                    onClick={() => handleSelectIcon(option)}
                >
                    {renderIcon(option.value)}
                    <span className="text-xs mt-1">{option.label}</span>
                </div>
            ))}
        </div>
    );
};

export default SelectIcon;
