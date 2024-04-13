import { ComponentType, HTMLAttributes, useState } from 'react';
import { Table as RBTable } from 'react-bootstrap'; // TODO: Replace
import { Store } from '@tanstack/react-store';

import { DataType } from '@/Data';
import { useStoreSetStateEffect } from '@/hooks';

import { TableBody } from './TableBody';
import { TableBodyFallback } from './TableBodyFallback';
import { TableCell } from './TableCell';
import { TableHead } from './TableHead';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';
import { TableRow } from './TableRow';
import { TableStore, TableStoreContext } from './TableStoreContext';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  columnIds: string[];
  data: DataType[];
  TableBodyFallbackComponent?: ComponentType;
}

export const Table = Object.assign(
  ({
    data,
    columnIds,
    TableBodyFallbackComponent = TableBodyFallback,
    children,
    ...props
  }: TableProps) => {
    const [tableStore] = useState(new Store<TableStore>({ data, columnIds }));
    useStoreSetStateEffect({
      store: tableStore,
      setState: (state) => ({ ...state, columnIds }),
      deps: [columnIds]
    });
    useStoreSetStateEffect({
      store: tableStore,
      setState: (state) => ({ ...state, data }),
      deps: [data]
    });

    return (
      <TableStoreContext.Provider value={tableStore}>
        <RBTable {...props} hover>
          {children === undefined ? (
            <>
              <TableHead />
              {data.length > 0 ? <TableBody /> : <TableBodyFallbackComponent />}
            </>
          ) : (
            children
          )}
        </RBTable>
      </TableStoreContext.Provider>
    );
  },
  {
    Body: TableBody,
    BodyFallback: TableBodyFallback,
    Cell: TableCell,
    Head: TableHead,
    HeaderCell: TableHeaderCell,
    HeaderRow: TableHeaderRow,
    Row: TableRow,
  },
);
