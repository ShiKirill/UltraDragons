import { useCallback, useState } from "react";

export interface CrudState<T> {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  editingItem: T | null;
  formData: T;
  modalTitle: string;
}

export const useCrudState = <T extends { id?: number }>({
  entityName,
}: {
  entityName?: string;
}) => {
  const [state, setState] = useState<CrudState<T>>({
    isCreateOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    editingItem: null,
    formData: {} as T,
    modalTitle: "",
  });

  const openCreate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCreateOpen: true,
      formData: {} as T,
      modalTitle: `Add ${entityName}`,
    }));
  }, []);

  const openEdit = useCallback((item: T) => {
    setState((prev) => ({
      ...prev,
      isEditOpen: true,
      editingItem: item,
      formData: { ...item },
      modalTitle: `Edit ${entityName}`,
    }));
  }, []);

  const openDelete = useCallback((item: T) => {
    setState((prev) => ({
      ...prev,
      isDeleteOpen: true,
      editingItem: item,
      formData: { ...item },
      modalTitle: `Delete ${entityName}`,
    }));
  }, []);

  const closeModals = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCreateOpen: false,
      isEditOpen: false,
      isDeleteOpen: false,
      editingItem: null,
      formData: {} as T,
      modalTitle: "",
    }));
  }, []);

  const updateFormData = useCallback((updates: T) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  const setFormData = useCallback((data: T) => {
    setState((prev) => ({
      ...prev,
      formData: data,
    }));
  }, []);

  return {
    state,
    actions: {
      openCreate,
      openEdit,
      openDelete,
      closeModals,
      updateFormData,
      setFormData,
    },
  };
};
