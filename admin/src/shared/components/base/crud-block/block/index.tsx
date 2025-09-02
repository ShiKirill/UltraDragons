import { AppModal } from "@/shared/components/base/app-modal";
import { DeleteModal } from "@/shared/components/base/app-modal/remove";
import { CrudForm } from "@/shared/components/base/crud-block/form";
import { CrudTable } from "@/shared/components/base/crud-block/table";
import {
  ColumnConfig,
  FormField,
} from "@/shared/components/base/crud-block/types";
import { HeaderBlock } from "@/shared/components/base/header-block";
import { useCrudState } from "@/shared/hooks/use-crud-state";
import { Box } from "@mui/material";

interface CrudBlockProps<T extends { id?: string | number }> {
  title: string;
  data?: T[];
  isLoading?: boolean;
  columns?: ColumnConfig<T>[];
  formFields: FormField<T>[];
  onCreate?: (data: T) => void;
  onUpdate?: (data: T) => void;
  onDelete?: (item: T) => void;
  createLabel?: string;
  isDeleting?: boolean;
}

export const CrudBlock = <T extends { id?: string | number }>({
  title,
  data = [],
  isLoading = false,
  columns,
  formFields,
  createLabel = `Add ${title.toLowerCase()}`,
  onCreate,
  onUpdate,
  onDelete,
  isDeleting = false,
}: CrudBlockProps<T>) => {
  const { state, actions } = useCrudState<T>();

  const handleCreate = () => {
    onCreate?.(state.formData);
    actions.closeModals();
  };

  const handleUpdate = () => {
    if (state.editingItem?.id) {
      onUpdate?.(state.formData);
      actions.closeModals();
    }
  };

  const handleDelete = () => {
    if (state.editingItem?.id) {
      onDelete?.(state.editingItem);
      actions.closeModals();
    }
  };

  const handleFieldChange = (field: keyof T, value: string) => {
    actions.updateFormData({ [field]: value } as T);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box component="section">
      <HeaderBlock
        title={title}
        actions={[{ label: createLabel, onClick: actions.openCreate }]}
      />

      <CrudTable
        data={data}
        columns={columns}
        onEdit={onUpdate && actions.openEdit}
        onDelete={onDelete && actions.openDelete}
      />

      {/* Modals */}
      <AppModal
        isOpen={state.isCreateOpen}
        onClose={actions.closeModals}
        title={createLabel}
      >
        <CrudForm
          fields={formFields}
          data={state.formData}
          onChange={handleFieldChange}
          onSubmit={handleCreate}
          onCancel={actions.closeModals}
          submitLabel="Create"
        />
      </AppModal>

      <AppModal
        isOpen={state.isEditOpen}
        onClose={actions.closeModals}
        title={`Edit ${title.toLowerCase()}`}
      >
        <CrudForm
          fields={formFields}
          data={state.formData}
          onChange={handleFieldChange}
          onSubmit={handleUpdate}
          onCancel={actions.closeModals}
          submitLabel="Update"
        />
      </AppModal>

      <AppModal
        isOpen={state.isDeleteOpen}
        onClose={actions.closeModals}
        title={`Delete ${title.toLowerCase()}`}
      >
        <DeleteModal
          item={state.editingItem}
          title={title}
          itemNameField={"title" as keyof T}
          onSubmit={handleDelete}
          onCancel={actions.closeModals}
          submitLabel="Delete"
          isSubmitting={isDeleting}
        />
      </AppModal>
    </Box>
  );
};
