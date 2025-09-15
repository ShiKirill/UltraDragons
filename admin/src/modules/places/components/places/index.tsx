import { usePlacesMutation } from "@/modules/places/hooks/use-mutation";
import { usePlacesQuery } from "@/modules/places/hooks/use-query";
import { AppModal } from "@/shared/components/base/app-modal";
import { RemoveContent } from "@/shared/components/base/app-modal/remove-content";
import { CrudTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { Box } from "@mui/material";

import {
  IPlace,
  IPlaceCreateDto,
  IPlaceUpdateDto,
} from "@/api/crud/places/types";

import { PlaceForm } from "../form";
import { columns } from "./columns";
import { styles } from "./styles";

export const PlacesBlock = () => {
  const { data = [] } = usePlacesQuery();
  const { createPlace, updatePlace, deletePlace } = usePlacesMutation();
  const { state, actions } = useCrudState<IPlace>({ entityName: "place" });

  const handleDelete = () => {
    if (!state.editingItem?.id) return;
    deletePlace(state.editingItem?.id);
    actions.closeModals();
  };

  const handleSubmit = (data: IPlaceCreateDto | IPlaceUpdateDto) => {
    if ("id" in data) {
      updatePlace(data);
    } else {
      createPlace(data);
    }
  };

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock
        title="Places"
        actions={[{ label: "Add place", onClick: actions.openCreate }]}
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
          <PlaceForm
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
