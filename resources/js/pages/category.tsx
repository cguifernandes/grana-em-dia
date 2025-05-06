import FormCategory from "@/components/forms/form-category";
import CategoriesList from "@/components/layout/categories-list";
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
import DeleteDialog from "@/components/delete-dialog";

const Profile = () => {
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

	return (
		<>
			<Head title="Categorias" />
			<DashboardLayout title="Categorias">
				<div className="h-full flex flex-col gap-y-4">
					<CategoriesList
						categories={categories}
						onClickButtonAdd={() => setDialogOpen(true)}
						onEdit={handleEditCategory}
						onDelete={handleDeleteCategory}
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

export default Profile;
