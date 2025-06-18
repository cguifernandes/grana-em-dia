import DeleteDialog from "@/components/layout/delete-dialog";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Dialog } from "@/components/ui/dialog";
import { PageProps, TransactionType } from "@/types/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DataTable from "@/components/layout/data-table";
import FormTransactions from "@/components/forms/form-transactions";
import { toast } from "sonner";
import { formatCurrency, renderIcon } from "@/utils/functions";
import { cn } from "@/lib/utils";

const Transactions = () => {
    const { flash, transactions, categories } = usePage<PageProps>().props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] =
        useState<TransactionType | null>(null);
    const [editingTransaction, setEditingTransaction] =
        useState<TransactionType | null>(null);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        } else if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingTransaction(null);
    };

    const handleEditTransaction = (transaction: TransactionType) => {
        setEditingTransaction(transaction);
        setDialogOpen(true);
    };

    const handleDeleteTransaction = (transaction: TransactionType) => {
        setTransactionToDelete(transaction);
        setDeleteDialogOpen(true);
    };

    const confirmDeleteTransaction = () => {
        if (transactionToDelete) {
            setIsLoadingDelete(true);

            router.delete(
                route("transaction.destroy", transactionToDelete.id),
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setTransactionToDelete(null);
                    },
                    onFinish: () => {
                        setIsLoadingDelete(false);
                    },
                },
            );
        }
    };

    const columns = [
        {
            header: "Descrição",
            accessorKey: "description" as const,
        },
        {
            header: "Categoria",
            accessorKey: "category_id" as const,
            cell: (transaction: TransactionType) => (
                <div className="flex items-center gap-x-2">
                    <div
                        style={{
                            backgroundColor: `${transaction.category.color}33`,
                            color: transaction.category.color,
                        }}
                        className="p-1.5 w-fit rounded-md flex items-center justify-center"
                    >
                        {renderIcon(transaction.category.icon, 16)}
                    </div>
                    <span className="text-sm font-medium">
                        {transaction.category.name}
                    </span>
                </div>
            ),
        },
        {
            header: "Data da transação",
            accessorKey: "date" as const,
            cell: (transaction: TransactionType) => (
                <span className="text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                        timeZone: "UTC",
                    })}
                </span>
            ),
        },
        {
            header: "Valor",
            accessorKey: "amount" as const,
            cell: (transaction: TransactionType) => (
                <span
                    className={cn(
                        "",
                        transaction.type === "expense"
                            ? "text-destructive"
                            : "text-primary",
                    )}
                >
                    {transaction.type === "expense" ? "-" : ""}
                    {formatCurrency(transaction.amount)}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title="Transações" />
            <DashboardLayout title="Transações">
                <div className="h-full flex flex-col gap-y-4">
                    <DataTable
                        data={transactions}
                        columns={columns}
                        searchField="description"
                        searchPlaceholder="Buscar transações..."
                        addButtonText="Criar uma nova transação"
                        onClickButtonAdd={() => setDialogOpen(true)}
                        onEdit={handleEditTransaction}
                        onDelete={handleDeleteTransaction}
                        emptyMessage="Nenhuma transação encontrada"
                    />

                    <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
                        <DialogContent className="max-w-md gap-6">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingTransaction
                                        ? "Editar transação"
                                        : "Adicionar nova transação"}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingTransaction
                                        ? "Edite os dados da transação."
                                        : "Crie uma nova transação para organizar suas finanças."}
                                </DialogDescription>
                            </DialogHeader>

                            <FormTransactions
                                categories={categories}
                                onSuccess={handleCloseDialog}
                                defaultValues={editingTransaction}
                            />
                        </DialogContent>
                    </Dialog>

                    <DeleteDialog
                        visibleDialog={deleteDialogOpen}
                        setVisibleDialog={setDeleteDialogOpen}
                        onConfirmDelete={confirmDeleteTransaction}
                        loading={isLoadingDelete}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default Transactions;
