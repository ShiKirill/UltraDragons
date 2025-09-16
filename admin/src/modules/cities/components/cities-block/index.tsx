import { useCitiesMutation } from "@/modules/cities/hooks/use-mutation";
import { useCitiesQuery } from "@/modules/cities/hooks/use-query";
import { AppModal } from "@/shared/components/base/app-modal";
import { RemoveContent } from "@/shared/components/base/app-modal/remove-content";
import { CrudTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { Box } from "@mui/material";

import { ICity, ICityCreateDto } from "@/api/crud/cities/types";

import { CityForm } from "../form";
import { columns } from "./columns";
import { styles } from "./styles";

export const CitiesBlock = () => {
  const { data = [] } = useCitiesQuery();
  const { createCity, deleteCity } = useCitiesMutation();
  const { state, actions } = useCrudState<ICity>({ entityName: "city" });

  const handleDelete = () => {
    if (!state.editingItem?.id) return;
    deleteCity(state.editingItem?.id);
    actions.closeModals();
  };

  const handleSubmit = (data: ICityCreateDto) => {
    createCity(data);
  };

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock
        title="Cities"
        actions={[{ label: "Add city", onClick: actions.openCreate }]}
      />

      <CrudTable
        data={data}
        columns={columns}
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
            title="city"
            onSubmit={handleDelete}
            onCancel={actions.closeModals}
            submitLabel="Delete"
          />
        ) : (
          <CityForm onCancel={actions.closeModals} onSubmit={handleSubmit} />
        )}
      </AppModal>
    </Box>
  );
};
