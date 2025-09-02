import { useUsersMutation } from "@/modules/users/hooks/use-mutation";
import { useUsersQuery } from "@/modules/users/hooks/use-query";
import { CrudBlock } from "@/shared/components/base/crud-block/block";

import { IUser, IUserCreateDto, IUserUpdateDto } from "@/api/crud/users/types";

import { columns, formFields } from "./columns";

export const UsersBlock = () => {
  const { data, isLoading } = useUsersQuery();
  const { createUser, updateUser, deleteUser, isDeleting } = useUsersMutation();

  const handleCreate = (data: IUserCreateDto) => {
    createUser(data);
  };

  const handleUpdate = (data: IUserUpdateDto) => {
    updateUser(data);
  };

  const handleDelete = (item: IUser) => {
    deleteUser(item.id);
  };

  return (
    <CrudBlock
      title="Users"
      createLabel="Add user"
      data={data}
      isLoading={isLoading}
      columns={columns}
      formFields={formFields}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      isDeleting={isDeleting}
    />
  );
};
