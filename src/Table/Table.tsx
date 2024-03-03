import { ReactNode } from 'react'
import { Table as RBTable } from 'react-bootstrap'

import { Data } from '@/ModelData'
import { Slots } from '@/Slots';
import { BaseComponentProps, Field } from "@/types";

import { TableHead, TABLE_HEAD_SLOT } from './TableHead';
import { TableHeader } from './TableHeader'
import { TableActionHeader } from './TableActionHeader';
import { TableBody, TABLE_BODY_SLOT } from './TableBody';
import { TableRow } from './TableRow'
import { TableCell } from './TableCell';
import { TableActionCell } from './TableActionCell';
import { TableEmptyBody, TABLE_EMPTY_BODY_SLOT } from './TableEmptyBody';
import { TableContext, TableProvider } from './TableContext';


export interface TableProps extends BaseComponentProps {
    fields: Field[],
    data: Data[],
    actionsConfig?: TableContext['actionsConfig']
    children?: ReactNode;
}

export const Table = Object.assign(({ fields, data, actionsConfig, children, id, className, style }: TableProps) => {
    return (
        <RBTable id={id} className={className} style={style} hover bordered>
            <TableProvider fields={fields} data={data} actionsConfig={actionsConfig}>
                <Slots slotKeys={[TABLE_HEAD_SLOT, TABLE_BODY_SLOT, TABLE_EMPTY_BODY_SLOT]}>
                    <TableHead />
                    <TableBody>
                        <TableRow />
                    </TableBody>
                    <TableEmptyBody />
                    {children}
                </Slots>
            </TableProvider>
        </RBTable>
    )
}, {
    Head: TableHead,
    Header: TableHeader,
    ActionHeader: TableActionHeader,
    Body: TableBody,
    Row: TableRow,
    Cell: TableCell,
    ActionCell: TableActionCell,
    EmptyBody: TableEmptyBody
});