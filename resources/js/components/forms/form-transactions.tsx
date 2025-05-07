import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";
import {
	transactionsSchema,
	transactionsSchemaType,
} from "@/utils/zod/transactionsSchema";
import { CategoryType, TransactionType } from "@/types/types";
import { NumericFormat } from "react-number-format";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useState } from "react";
import { renderIcon } from "@/utils/functions";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

type FormTransactionsProps = {
	onSuccess: () => void;
	defaultValues?: TransactionType | null;
	categories?: CategoryType[];
};

const FormTransactions = ({
	onSuccess,
	defaultValues,
	categories,
}: FormTransactionsProps) => {
	const [openTypeSelect, setOpenTypeSelect] = useState(false);
	const [openCategorySelect, setOpenCategorySelect] = useState(false);
	const { data, setData, setError, errors, put, post, processing } =
		useForm<transactionsSchemaType>({
			description: defaultValues?.description ?? "",
			amount: defaultValues?.amount ? Number(defaultValues.amount) : 0,
			date: defaultValues?.date
				? new Date(
						new Date(defaultValues.date).toLocaleString("en-US", {
							timeZone: "UTC",
						}),
					)
				: new Date(),
			category_id: defaultValues?.category_id ?? 0,
			type: defaultValues?.type ?? "expense",
		});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const result = transactionsSchema.safeParse(data);

		if (!result.success) {
			const zodErrors = result.error.format();

			setError({
				description: zodErrors.description?._errors[0] ?? "",
				amount: zodErrors.amount?._errors[0] ?? "",
				date: zodErrors.date?._errors[0] ?? "",
				category_id: zodErrors.category_id?._errors[0] ?? "",
				type: zodErrors.type?._errors[0] ?? "",
			});
		} else {
			setError({
				description: "",
				amount: "",
				date: "",
				category_id: "",
				type: "",
			});

			if (defaultValues) {
				put(route("transaction.update", { transaction: defaultValues.id }), {
					onSuccess: () => {
						onSuccess();
					},
				});
			} else {
				post(route("transaction.store"), {
					onSuccess: () => {
						onSuccess();
					},
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid w-full items-center gap-4">
				<div className="flex flex-col gap-y-2">
					<Label htmlFor="description">Descrição</Label>
					<Input
						value={data.description}
						onChange={(e) => setData("description", e.target.value)}
						id="description"
						placeholder="Ex: Compras no Supermercado"
						aria-invalid={!!errors.description}
						maxLength={20}
					/>
					{errors.description && errors.description !== "" && (
						<p className="text-xs text-destructive">{errors.description}</p>
					)}
				</div>

				<div className="flex flex-col gap-y-2">
					<Label htmlFor="amount">Valor</Label>
					<NumericFormat
						value={data.amount}
						onValueChange={(values) => {
							setData("amount", values.floatValue ?? 0);
						}}
						decimalSeparator=","
						thousandSeparator="."
						prefix="R$ "
						customInput={Input}
						decimalScale={2}
						fixedDecimalScale
						placeholder="R$ 0,00"
						aria-invalid={!!errors.amount}
					/>
					{errors.amount && errors.amount !== "" && (
						<p className="text-xs text-destructive">{errors.amount}</p>
					)}
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="type">Tipo da transação</Label>
						<Select
							value={data.type}
							onValueChange={(value) =>
								setData("type", value as "expense" | "income")
							}
							open={openTypeSelect}
							onOpenChange={(open) => {
								setOpenTypeSelect(open);
								if (open) setOpenCategorySelect(false);
							}}
						>
							<SelectTrigger
								id="type"
								className={cn("w-full", errors.type && "border-destructive")}
							>
								<SelectValue placeholder="Selecione o tipo" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="expense">Despesa</SelectItem>
									<SelectItem value="income">Receita</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.type && errors.type !== "" && (
							<p className="text-xs text-destructive">{errors.type}</p>
						)}
					</div>
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="category_id">Categoria</Label>
						<Select
							value={data.category_id ? data.category_id.toString() : ""}
							onValueChange={(value) => setData("category_id", parseInt(value))}
							open={openCategorySelect}
							onOpenChange={(open) => {
								setOpenCategorySelect(open);
								if (open) setOpenTypeSelect(false);
							}}
						>
							<SelectTrigger
								id="category_id"
								className={cn(
									"w-full",
									errors.category_id && "border-destructive",
								)}
							>
								<SelectValue placeholder="Selecione a categoria" />
							</SelectTrigger>
							<SelectContent className="max-h-[200px] overflow-y-auto">
								<SelectGroup>
									{categories && categories.length > 0 ? (
										categories.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												<div className="flex items-center gap-2">
													{renderIcon(category.icon, 16, category.color)}
													<span>{category.name}</span>
												</div>
											</SelectItem>
										))
									) : (
										<SelectItem value="0" disabled>
											Nenhuma categoria
										</SelectItem>
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
						{errors.category_id && errors.category_id !== "" && (
							<p className="text-xs text-destructive">{errors.category_id}</p>
						)}
					</div>
				</div>

				<div className="flex flex-col gap-y-2">
					<Label htmlFor="date">Data da transação</Label>
					<Popover modal>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="w-full bg-transparent justify-start text-left font-normal"
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{data.date
									? format(data.date, "dd 'de' MMMM 'de' yyyy", {
											locale: ptBR,
										})
									: "Selecione uma data"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								locale={ptBR}
								mode="single"
								selected={data.date}
								onSelect={(date) => {
									if (date) {
										setData("date", date);
									}
								}}
							/>
						</PopoverContent>
					</Popover>
					{errors.date && errors.date !== "" && (
						<p className="text-xs text-destructive">{errors.date}</p>
					)}
				</div>

				<Button isLoading={processing} type="submit" className="w-24">
					{defaultValues ? "Atualizar" : "Salvar"}
				</Button>
			</div>
		</form>
	);
};

export default FormTransactions;
