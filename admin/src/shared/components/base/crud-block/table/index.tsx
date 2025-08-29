import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ColumnConfig } from "../types";

interface CrudTableProps<T extends { id?: string | number }> {
  data: T[];
  columns?: ColumnConfig<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  showActions?: boolean;
}

const extractColumns = <T extends object>(data: T[]): ColumnConfig<T>[] => {
  if (!data.length) return [];

  return Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
  }));
};

export const CrudTable = <T extends { id?: string | number }>({
  data,
  columns,
  onEdit,
  onDelete,
  showActions = true,
}: CrudTableProps<T>) => {
  const autoColumns = columns || extractColumns(data);
  const displayColumns = showActions
    ? [...autoColumns, { key: "actions" as keyof T, label: "" }]
    : autoColumns;

  const renderCell = (column: ColumnConfig<T>, row: T) => {
    if (column.key === "actions") {
      return (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          {onEdit && (
            <IconButton
              size="small"
              onClick={() => onEdit(row)}
              color="primary"
            >
              <Edit fontSize="small" />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="small"
              onClick={() => onDelete(row)}
              color="error"
            >
              <Delete fontSize="small" />
            </IconButton>
          )}
        </Box>
      );
    }

    const value = row[column.key];
    if (column.render) {
      return column.render(String(value), row);
    }

    return String(value || "");
  };

  return (
    <TableContainer>
      <Table aria-label="crud table">
        <TableHead>
          <TableRow>
            {displayColumns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.label ?? ""}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id || index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {displayColumns.map((column) => (
                <TableCell key={String(column.key)}>
                  {renderCell(column, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
