import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/types";
import { formatCurrency, renderIcon } from "@/utils/functions";

type CategoryCardProps = Omit<CategoryType, "created_at" | "updated_at"> & {
	amount: number;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
};

const CategoryCard = ({
	name,
	amount,
	icon,
	color,
	onMouseEnter,
	onMouseLeave,
}: CategoryCardProps) => {
	return (
		<div
			className={cn("p-3 flex-1 flex gap-2 border rounded-md")}
			style={{
				borderColor: `${color}33`,
				backgroundColor: `${color}1A`,
			}}
			key={name}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div
				style={{ color, backgroundColor: `${color}33` }}
				className="flex items-center rounded-md w-8 h-8 justify-center p-1.5"
			>
				{renderIcon(icon)}
			</div>
			<div className="flex flex-col gap-y-1">
				<h3 className="text-sm leading-none font-medium">{name}</h3>
				<p style={{ color }} className={cn("text-sm leading-none")}>
					{formatCurrency(amount)}
				</p>
			</div>
		</div>
	);
};

export default CategoryCard;
