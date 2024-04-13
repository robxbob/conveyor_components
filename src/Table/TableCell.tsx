import { HTMLAttributes } from 'react'

import { useData } from '@/Data';
import { Slot } from '@/Slots';

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  columnId: string;
}

export const TableCell = ({
  columnId,
  children,
  ...props
}: TableCellProps) => {
  const { data } = useData((state) => state.original);
  const columnData = data[columnId];
  const displayData = typeof columnData === 'object'
    ? JSON.stringify(columnData)
    : columnData;
  return (
    <Slot slot={columnId}>
      <td {...props}>
        {children === undefined ? displayData : children}
      </td>
    </Slot>
  );
};
