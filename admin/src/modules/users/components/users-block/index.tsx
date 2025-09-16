import { useUsersMutation } from "@/modules/users/hooks/use-mutation";
import { useUsersQuery } from "@/modules/users/hooks/use-query";
import { AppModal } from "@/shared/components/base/app-modal";
import { RemoveContent } from "@/shared/components/base/app-modal/remove-content";
import { CrudTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { Box } from "@mui/material";

import { IUser, IUserCreateDto, IUserUpdateDto } from "@/api/crud/users/types";

import { UserForm } from "../form";
import { columns } from "./columns";
import { styles } from "./styles";

export const UsersBlock = () => {
  const { data = [] } = useUsersQuery();
  const { createUser, updateUser, deleteUser } = useUsersMutation();
  const { state, actions } = useCrudState<IUser>({ entityName: "user" });

  const handleSubmit = (data: IUserCreateDto | IUserUpdateDto) => {
    if ("id" in data) {
      updateUser(data);
    } else {
      createUser(data);
    }
  };

  const handleDelete = () => {
    if (!state.editingItem?.id) return;
    deleteUser(state.editingItem?.id);
    actions.closeModals();
  };

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock
        title="Users"
        actions={[{ label: "Add user", onClick: actions.openCreate }]}
      />

      <CrudTable
        data={data}
        columns={columns}
        onEdit={actions.openEdit}
        onDelete={actions.openDelete}
      />

      <AppModal
        isOpen={state.isCreateOpen || state.isEditOpen || state.isDeleteOpen}
        onClose={actions.closeModals}
        title={state.modalTitle}
      >
        {state.isDeleteOpen && state.editingItem?.name ? (
          <RemoveContent
            removingItemName={state.editingItem.name}
            title="Delete place"
            onSubmit={handleDelete}
            onCancel={actions.closeModals}
            submitLabel="Delete"
          />
        ) : (
          <UserForm
            onCancel={actions.closeModals}
            onSubmit={handleSubmit}
            editingItem={state.editingItem}
            isEdit={state.isEditOpen}
          />
        )}
      </AppModal>
    </Box>
  );
};
