import { Pencil, Search, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { CategoryType } from "@/types/types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { renderIcon } from "@/utils/functions";
import ActionsCell from "@/components/actions-cell";

type CategoriesListProps = {
	onClickButtonAdd: () => void;
	categories: CategoryType[] | undefined;
	onEdit?: (category: CategoryType) => void;
	onDelete?: (category: CategoryType) => void;
};

const CategoriesList = ({
	onClickButtonAdd,
	categories,
	onEdit,
	onDelete,
}: CategoriesListProps) => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCategories = categories?.filter((category) =>
		category.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<>
			<div className="flex items-center w-full justify-between">
				<div className="flex items-center mb-4 relative">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Buscar categorias..."
						className="pl-9 w-96"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Button onClick={onClickButtonAdd}>Criar uma nova categoria</Button>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nome</TableHead>
							<TableHead>Criado em</TableHead>
							<TableHead>Atualizado em</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>

					<TableBody>
						{!filteredCategories ||
						(filteredCategories && filteredCategories.length) === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="text-center">
									Nenhuma categoria encontrada
								</TableCell>
							</TableRow>
						) : (
							filteredCategories?.map((category) => (
								<TableRow key={category.id}>
									<TableCell>
										<div className="flex items-center gap-x-2">
											<div
												style={{
													backgroundColor: `${category.color}33`,
													color: category.color,
												}}
												className="p-1.5 w-fit rounded-md flex items-center justify-center"
											>
												{renderIcon(category.icon, 16)}
											</div>
											<span className="text-sm font-medium">
												{category.name}
											</span>
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{new Date(category.created_at).toLocaleDateString()}
									</TableCell>
									<TableCell className="text-muted-foreground">
										{new Date(category.updated_at).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<ActionsCell
											actions={[
												{
													label: "Editar",
													onClick: () => onEdit?.(category),
													icon: (
														<Pencil
															className="text-popover-foreground"
															size={16}
														/>
													),
												},
												{
													label: "Excluir",
													onClick: () => onDelete?.(category),
													icon: (
														<Trash className="text-destructive" size={16} />
													),
													className:
														"!text-destructive focus:bg-destructive/20",
												},
											]}
										/>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export default CategoriesList;
