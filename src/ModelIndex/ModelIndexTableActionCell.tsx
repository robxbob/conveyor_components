import {
  FaRegTrashAlt,
  FaEdit,
  FaRegSave,
  FaRegTimesCircle,
} from 'react-icons/fa';

import { Lens, useLenses, DataLens } from '@/Lenses';

import { TableCell, TableCellProps } from '@/Table';

import { useModelIndex } from './useModelIndex';

export interface ModelIndexTableActionCellProps
extends Omit<TableCellProps, 'columnId'> {
}

export const ModelIndexTableActionCell = ({
  children,
  ...props
}: ModelIndexTableActionCellProps) => {
  const { setLens } = useLenses();
  const modelIndexStore = useModelIndex();
  // const { } = useStore(modelIndexStore, (state) => ({
  //   data: state.data,
  //   fields: state.fields,
  //   actionsConfig: state.actionsConfig,
  // }));

  const onEdit = () => setLens(DataLens.EDITING);
  const onCancelEdit = () => setLens(DataLens.DISPLAY);

  return (
    <TableCell columnId={} {...props}>
      {children === undefined ? (
        <div>
          <Lens lens={DataLens.DISPLAY}>
            <button onClick={onEdit}>
              <FaEdit />
            </button>
            <button>
              <FaRegTrashAlt />
            </button>
          </Lens>
          <Lens lens={DataLens.EDITING}>
            <button>
              <FaRegSave />
            </button>
            <button onClick={onCancelEdit}>
              <FaRegTimesCircle />
            </button>
          </Lens>
        </div>
      ) : (
        children
      )}
    </td>
  );
};
