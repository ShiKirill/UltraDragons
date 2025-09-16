import { usePicturesMutation } from "@/modules/pictures/hooks/use-mutation";
import { usePicturesQuery } from "@/modules/pictures/hooks/use-query";
import { AppModal } from "@/shared/components/base/app-modal";
import { RemoveContent } from "@/shared/components/base/app-modal/remove-content";
import { CrudTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { IPicture } from "@/shared/types/common";
import { Box } from "@mui/material";

import { columns } from "./columns";
import { styles } from "./styles";

export const PicturesBlock = () => {
  const { data = [] } = usePicturesQuery();
  const { deletePicture } = usePicturesMutation();
  const { state, actions } = useCrudState<IPicture>({ entityName: "picture" });

  const handleDelete = () => {
    if (!state.editingItem?.id) return;
    deletePicture(state.editingItem?.id);
    actions.closeModals();
  };

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock title="Pictures" />

      <CrudTable data={data} columns={columns} onDelete={actions.openDelete} />

      <AppModal
        isOpen={state.isCreateOpen || state.isEditOpen || state.isDeleteOpen}
        onClose={actions.closeModals}
        title={state.modalTitle}
      >
        {state.isDeleteOpen && state.editingItem?.file_name && (
          <RemoveContent
            removingItemName={state.editingItem.file_name}
            title="picture"
            onSubmit={handleDelete}
            onCancel={actions.closeModals}
            submitLabel="Delete"
          />
        )}
      </AppModal>
    </Box>
  );
};
