import FormCategory from "@/components/forms/form-category";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CategoryType, PageProps } from "@/types/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteDialog from "@/components/layout/delete-dialog";
import DataTable from "@/components/layout/data-table";
import { renderIcon } from "@/utils/functions";

const Category = () => {
	const { flash, categories } = usePage<PageProps>().props;
	const [dialogOpen, setDialogOpen] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
		null,
	);
	const [editingCategory, setEditingCategory] = useState<CategoryType | null>(
		null,
	);

	useEffect(() => {
		if (flash.success) {
			toast.success(flash.success);
		} else if (flash.error) {
			toast.error(flash.error);
		}
	}, [flash]);

	const handleCloseDialog = () => {
		setDialogOpen(false);
		setEditingCategory(null);
	};

	const handleEditCategory = (category: CategoryType) => {
		setEditingCategory(category);
		setDialogOpen(true);
	};

	const handleDeleteCategory = (category: CategoryType) => {
		setCategoryToDelete(category);
		setDeleteDialogOpen(true);
	};

	const confirmDeleteCategory = () => {
		if (categoryToDelete) {
			setIsLoadingDelete(true);

			router.delete(route("category.destroy", categoryToDelete.id), {
				onSuccess: () => {
					setDeleteDialogOpen(false);
					setCategoryToDelete(null);
				},
				onFinish: () => {
					setIsLoadingDelete(false);
				},
			});
		}
	};

	const columns = [
		{
			header: "Nome",
			accessorKey: "name" as const,
			cell: (category: CategoryType) => (
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
					<span className="text-sm font-medium">{category.name}</span>
				</div>
			),
		},
		{
			header: "Criado em",
			accessorKey: "created_at" as const,
			cell: (category: CategoryType) => (
				<span className="text-muted-foreground">
					{new Date(category.created_at).toLocaleDateString()}
				</span>
			),
		},
		{
			header: "Atualizado em",
			accessorKey: "updated_at" as const,
			cell: (category: CategoryType) => (
				<span className="text-muted-foreground">
					{new Date(category.updated_at).toLocaleDateString()}
				</span>
			),
		},
	];

	return (
		<>
			<Head title="Categorias" />
			<DashboardLayout title="Categorias">
				<div className="h-full flex flex-col gap-y-4">
					<DataTable
						data={categories}
						columns={columns}
						searchField="name"
						searchPlaceholder="Buscar categorias..."
						addButtonText="Criar uma nova categoria"
						onClickButtonAdd={() => setDialogOpen(true)}
						onEdit={handleEditCategory}
						onDelete={handleDeleteCategory}
						emptyMessage="Nenhuma categoria encontrada"
						showPagination={false}
					/>

					<Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
						<DialogContent className="max-w-md gap-6">
							<DialogHeader>
								<DialogTitle>
									{editingCategory
										? "Editar categoria"
										: "Adicionar nova categoria"}
								</DialogTitle>
								<DialogDescription>
									{editingCategory
										? "Edite os dados da categoria."
										: "Crie uma nova categoria para organizar suas finanças."}
								</DialogDescription>
							</DialogHeader>

							<FormCategory
								onSuccess={handleCloseDialog}
								defaultValues={editingCategory}
							/>
						</DialogContent>
					</Dialog>

					<DeleteDialog
						visibleDialog={deleteDialogOpen}
						setVisibleDialog={setDeleteDialogOpen}
						onConfirmDelete={confirmDeleteCategory}
						loading={isLoadingDelete}
					/>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Category;
