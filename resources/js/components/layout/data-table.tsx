import { Pencil, Search, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import ActionsCell from "@/components/actions-cell";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "../ui/pagination";

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
    showPagination?: boolean;
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
    showPagination = true,
    emptyMessage = "Nenhum item encontrado",
}: DataTableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const filteredData = data?.filter((item) => {
        if (!searchField) return true;

        const value = item[searchField];

        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

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
                        {!paginatedData || paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        columns.length +
                                        (onEdit || onDelete ? 1 : 0)
                                    }
                                    className="text-center"
                                >
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item) => (
                                <TableRow key={item.id}>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={String(column.accessorKey)}
                                        >
                                            {column.cell
                                                ? column.cell(item)
                                                : String(
                                                      item[column.accessorKey],
                                                  )}
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
                                                                  onClick: () =>
                                                                      onEdit(
                                                                          item,
                                                                      ),
                                                                  icon: (
                                                                      <Pencil
                                                                          className="text-popover-foreground"
                                                                          size={
                                                                              16
                                                                          }
                                                                      />
                                                                  ),
                                                              },
                                                          ]
                                                        : []),
                                                    ...(onDelete
                                                        ? [
                                                              {
                                                                  label: "Excluir",
                                                                  onClick: () =>
                                                                      onDelete(
                                                                          item,
                                                                      ),
                                                                  icon: (
                                                                      <Trash
                                                                          className="text-destructive"
                                                                          size={
                                                                              16
                                                                          }
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

            <div className="flex justify-between items-center w-full">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Mostrando {paginatedData?.length} de {filteredData?.length}{" "}
                    registros
                </span>

                {showPagination && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationPrevious
                                onClick={() => {
                                    if (currentPage > 1) handlePreviousPage();
                                }}
                            />
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationNext
                                onClick={() => {
                                    if (currentPage < totalPages)
                                        handleNextPage();
                                }}
                            />
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </>
    );
};

export default DataTable;
