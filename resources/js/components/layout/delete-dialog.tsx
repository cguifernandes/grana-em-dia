import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

type DeleteDialogProps = {
    visibleDialog: boolean;
    setVisibleDialog: (open: boolean) => void;
    onConfirmDelete: () => void;
    loading: boolean;
};

const DeleteDialog = ({
    visibleDialog,
    setVisibleDialog,
    onConfirmDelete,
    loading,
}: DeleteDialogProps) => {
    return (
        <Dialog open={visibleDialog} onOpenChange={setVisibleDialog}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirmar exclusão</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a categoria? Essa ação
                        não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setVisibleDialog(false)}
                    >
                        Cancelar
                    </Button>

                    <Button
                        isLoading={loading}
                        variant="destructive"
                        onClick={onConfirmDelete}
                        disabled={loading}
                        className="w-24"
                    >
                        Excluir
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
