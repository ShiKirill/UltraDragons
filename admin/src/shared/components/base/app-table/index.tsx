import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ColumnConfig } from "./types";
import { extractColumns } from "./utils";

interface AppTablePropsWithConfig<T> {
  data: T[];
  additionalColumns?: ColumnConfig<T>[];
}

export const AppTable = <T extends object>({
  data,
  additionalColumns = [],
}: AppTablePropsWithConfig<T>) => {
  const autoColumns = extractColumns(data);
  const columns = [...autoColumns, ...additionalColumns];

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.label || String(column.key)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
