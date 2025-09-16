import { useInterestsMutation } from "@/modules/interests/hooks/use-mutation";
import { useInterestsQuery } from "@/modules/interests/hooks/use-query";
import { AppModal } from "@/shared/components/base/app-modal";
import { RemoveContent } from "@/shared/components/base/app-modal/remove-content";
import { CrudTable } from "@/shared/components/base/app-table";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { Box } from "@mui/material";

import { IInterest, IInterestCreateDto } from "@/api/crud/interests/types";

import { InterestForm } from "../form";
import { columns } from "./columns";
import { styles } from "./styles";

export const InterestsBlock = () => {
  const { data = [] } = useInterestsQuery();
  const { createInterest, deleteInterest } = useInterestsMutation();
  const { state, actions } = useCrudState<IInterest>({
    entityName: "interest",
  });

  const handleDelete = () => {
    if (!state.editingItem?.id) return;
    deleteInterest(state.editingItem?.id);
    actions.closeModals();
  };

  const handleSubmit = (data: IInterestCreateDto) => {
    createInterest(data);
  };

  return (
    <Box sx={styles.wrapper} component="section">
      <HeaderBlock
        title="Interests"
        actions={[{ label: "Add interest", onClick: actions.openCreate }]}
      />

      <CrudTable data={data} columns={columns} onDelete={actions.openDelete} />

      <AppModal
        isOpen={state.isCreateOpen || state.isEditOpen || state.isDeleteOpen}
        onClose={actions.closeModals}
        title={state.modalTitle}
      >
        {state.isDeleteOpen && state.editingItem?.title ? (
          <RemoveContent
            removingItemName={state.editingItem.title}
            title="Delete place"
            onSubmit={handleDelete}
            onCancel={actions.closeModals}
            submitLabel="Delete"
          />
        ) : (
          <InterestForm
            onCancel={actions.closeModals}
            onSubmit={handleSubmit}
          />
        )}
      </AppModal>
    </Box>
  );
};
