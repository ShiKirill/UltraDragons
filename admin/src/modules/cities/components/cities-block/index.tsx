import { CrudBlock } from "@/shared/components/base/crud-block/block";

import { columns, formFields } from "./columns";
import { useCitiesQuery } from "@/modules/cities/hooks/use-query";
import { useCitiesMutation } from "@/modules/cities/hooks/use-mutation";
import { ICity, ICityCreateDto } from "@/api/crud/cities/types";

export const CitiesBlock = () => {
  const { data, isLoading } = useCitiesQuery();
  const { createCity, deleteCity, isDeleting } = useCitiesMutation();

  const handleCreate = (data: ICityCreateDto) => {
    createCity(data);
  };

  const handleDelete = (item: ICity) => {
    deleteCity(item.id);
  };

  return (
    <CrudBlock
      title="Cities"
      createLabel="Add city"
      data={data}
      isLoading={isLoading}
      columns={columns}
      formFields={formFields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  );
};
