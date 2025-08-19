import { useInterestsMutation } from "@/modules/interests/hooks/use-mutation";
import { useInterestsQuery } from "@/modules/interests/hooks/use-query";
import { CrudBlock } from "@/shared/components/base/crud-block/block";

import { IInterest, IInterestCreateDto } from "@/api/crud/interests/types";

import { columns, formFields } from "./columns";

export const InterestsBlock = () => {
  const { data: interests = [], isLoading } = useInterestsQuery();
  const { createInterest, deleteInterest, isDeleting } = useInterestsMutation();

  const handleCreate = (data: Partial<IInterest>) => {
    createInterest(data as IInterestCreateDto);
  };

  const handleDelete = (item: IInterest) => {
    deleteInterest(item.id);
  };

  return (
    <CrudBlock
      title="User interests"
      createLabel="Add interest"
      data={interests}
      isLoading={isLoading}
      columns={columns}
      formFields={formFields}
      onCreate={handleCreate}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  );
};
