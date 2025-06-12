import { categorySchema, categorySchemaType } from "@/utils/zod/categorySchema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import SelectIcon from "../select-icon";
import SelectColor from "../select-color";
import { Button } from "../ui/button";
import { categoryIcons } from "@/utils/functions";
import { CategoryColors } from "@/utils/enums";
import { CategoryType } from "@/types/types";
import { toast } from "sonner";

type FormCategoryProps = {
	onSuccess: () => void;
	defaultValues?: CategoryType | null;
};

const FormCategory = ({ onSuccess, defaultValues }: FormCategoryProps) => {
	const { data, setData, setError, errors, put, post, processing } =
		useForm<categorySchemaType>({
			color: defaultValues?.color ?? CategoryColors.Indigo,
			icon: defaultValues?.icon ?? categoryIcons[0].value,
			name: defaultValues?.name ?? "",
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = categorySchema.safeParse(data);

		if (!result.success) {
			const zodErrors = result.error.format();
			setError({
				name: zodErrors.name?._errors[0] ?? "",
				color: zodErrors.color?._errors[0] ?? "",
				icon: zodErrors.icon?._errors[0] ?? "",
			});
		} else {
			setError({
				name: "",
				color: "",
				icon: "",
			});

			if (defaultValues) {
				put(route("category.update", { category: defaultValues.id }), {
					onSuccess: () => {
						onSuccess();
					},
				});
			} else {
				post(route("category.store"), {
					onSuccess: () => {
						onSuccess();
					},
					onError: (flag) => {
						toast.error(flag.error)
					}
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="email">Nome da categoria</Label>
					<Input
						value={data.name}
						onChange={(e) => setData("name", e.target.value)}
						id="name"
						placeholder="Ex: Alimentação"
						aria-invalid={!!errors.name}
						maxLength={20}
					/>
					{errors.name && errors.name !== "" && (
						<p className="text-xs text-destructive">{errors.name}</p>
					)}
				</div>

				<div className="flex flex-col gap-y-2">
					<Label htmlFor="email">Ícone</Label>
					<SelectIcon
						defaultValue={defaultValues?.icon}
						onSelect={(item) => setData("icon", item.value)}
					/>
					{errors.icon && errors.icon !== "" && (
						<p className="text-xs text-destructive">{errors.icon}</p>
					)}
				</div>

				<div className="flex flex-col gap-y-2">
					<Label htmlFor="email">Cor de destaque</Label>
					<SelectColor
						defaultValue={defaultValues?.color}
						onSelect={(item) => setData("color", item)}
					/>
					{errors.color && errors.color !== "" && (
						<p className="text-xs text-destructive">{errors.color}</p>
					)}
				</div>

				<Button isLoading={processing} type="submit" className="w-24">
					{defaultValues ? "Atualizar" : "Salvar"}
				</Button>
			</div>
		</form>
	);
};

export default FormCategory;
