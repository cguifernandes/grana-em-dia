import { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

const InputPassword = ({
	className,
	type,
	...props
}: React.ComponentProps<"input">) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input type={showPassword ? "text" : "password"} {...props} />
			<button
				type="button"
				className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500"
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? (
					<EyeOff className="text-foreground" strokeWidth={1.5} size={18} />
				) : (
					<Eye className="text-foreground" strokeWidth={1.5} size={18} />
				)}
			</button>
		</div>
	);
};

export default InputPassword;
