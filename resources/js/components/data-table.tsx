import { Pencil, Search, Trash } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ActionsCell from "@/components/actions-cell";

type Column<T> = {
	header: string;
	accessorKey: keyof T;
	cell?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
	onClickButtonAdd: () => void;
	data: T[] | undefined;
	columns: Column<T>[];
	searchField?: keyof T;
	searchPlaceholder?: string;
	addButtonText?: string;
	onEdit?: (item: T) => void;
	onDelete?: (item: T) => void;
	emptyMessage?: string;
};

const DataTable = <T extends { id: number | string }>({
	onClickButtonAdd,
	data,
	columns,
	searchField,
	searchPlaceholder = "Buscar...",
	addButtonText = "Adicionar novo item",
	onEdit,
	onDelete,
	emptyMessage = "Nenhum item encontrado",
}: DataTableProps<T>) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredData = data?.filter((item) => {
		if (!searchField) return true;

		const value = item[searchField];

		return String(value).toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<div className="flex items-center w-full gap-x-2 justify-between">
				{searchField && (
					<div className="flex items-center flex-1 mb-4 relative">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder={searchPlaceholder}
							className="pl-9"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				)}
				<Button onClick={onClickButtonAdd}>{addButtonText}</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={String(column.accessorKey)}>
									{column.header}
								</TableHead>
							))}
							{(onEdit || onDelete) && <TableHead />}
						</TableRow>
					</TableHeader>

					<TableBody>
						{!filteredData || filteredData.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
									className="text-center"
								>
									{emptyMessage}
								</TableCell>
							</TableRow>
						) : (
							filteredData.map((item) => (
								<TableRow key={item.id}>
									{columns.map((column) => (
										<TableCell key={String(column.accessorKey)}>
											{column.cell
												? column.cell(item)
												: String(item[column.accessorKey])}
										</TableCell>
									))}
									{(onEdit || onDelete) && (
										<TableCell>
											<ActionsCell
												actions={[
													...(onEdit
														? [
																{
																	label: "Editar",
																	onClick: () => onEdit(item),
																	icon: (
																		<Pencil
																			className="text-popover-foreground"
																			size={16}
																		/>
																	),
																},
															]
														: []),
													...(onDelete
														? [
																{
																	label: "Excluir",
																	onClick: () => onDelete(item),
																	icon: (
																		<Trash
																			className="text-destructive"
																			size={16}
																		/>
																	),
																	className:
																		"!text-destructive focus:bg-destructive/20",
																},
															]
														: []),
												]}
											/>
										</TableCell>
									)}
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default DataTable;
