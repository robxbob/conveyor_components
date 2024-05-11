import { useEffect } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';

import { useAlerts } from '@/Alerts';
import { ModelForm } from '@/ModelForm';
import { OnSaveProps } from '@/types';
import { humanizeText } from '@/utils';

import { useConveyor } from '../Conveyor';
import {
  useModelUpdateMutation,
  useModelListMutation,
  useModelItemQuery,
} from '../hooks';
import { parseMQLType } from '../utils';

export interface ModelDetailPageProps {
  model?: string;
  id?: string;
}

export const ModelDetailPage = ({ model, id }: ModelDetailPageProps) => {
  const params = useParams({ from: '/$model/$id' });
  const currModel: string = model ?? params.model ?? '';
  const currId: string = id ?? params.id ?? '';
  const navigate = useNavigate();
  const { addAlert } = useAlerts();
  const {
    selected: { models },
  } = useConveyor((state) => {
    const { models } = state;
    return {
      models,
    };
  });

  const fields = models[currModel]?.fields ?? {};
  const detailFieldNames = Object.keys(fields).filter((fieldName) => {
    const fieldObj = parseMQLType(fieldName, fields[fieldName].update);
    return !fieldObj.many;
  });

  const detailFields = detailFieldNames.map((fieldName) => ({
    ...parseMQLType(fieldName, fields[fieldName].update),
    type: fields[fieldName].baseType,
  }));

  // Item query
  const { data, error, isLoading, isError, isSuccess, operationName } =
    useModelItemQuery({
      id: currId,
      model: currModel,
      fieldNames: detailFieldNames,
    });
  const detailData = data?.[operationName];

  // Select Mutation
  const { mutateAsync: selectOptionMutateAsync } = useModelListMutation();
  const onOpenFieldSelect = (model: string) => {
    return selectOptionMutateAsync(model).then((data: any) => {
      return data.items.map((item: any) => ({
        label: item.id,
        value: JSON.stringify(item.id),
      }));
    });
  };

  // Update Mutation
  const { mutateAsync: updateMutateAsync } = useModelUpdateMutation({
    model: currModel,
    fieldNames: detailFieldNames,
  });
  const onUpdate = async ({ data, dirtyFields }: OnSaveProps) => {
    Object.keys(data).forEach((fieldName) => {
      if (typeof data[fieldName] === 'object') {
        data[fieldName] = data[fieldName]?.id;
      }
    });
    return updateMutateAsync(data)
      .then(() => {
        addAlert({
          content: `${currModel} updated!`,
          className: 'success',
          expires: 2000,
        });
        navigate({ to: `/${currModel}` });
      })
      .catch((err) =>
        addAlert({
          content: `${currModel} failed to update: ${err}`,
          className: 'danger',
        }),
      );
  };

  useEffect(() => {
    const modelDisplayName = humanizeText(currModel);
    if (!isLoading) {
      if (isSuccess) {
      } else if (isError) {
        addAlert({
          content: `Failed to fetch ${modelDisplayName}: ${error}`,
          className: 'danger',
        });
      }
    }
  }, [data, isLoading, isSuccess, isError]);

  return detailData ? (
    <ModelForm
      fields={detailFields}
      defaultValues={detailData}
      title={
        <>
          <Link to={`/${currModel}`}>{humanizeText(currModel)}</Link>:{currId}
        </>
      }
      onSubmit={onUpdate}
      onOpenFieldSelect={onOpenFieldSelect}
      type="detail"
    />
  ) : (
    '...loading'
  );
};