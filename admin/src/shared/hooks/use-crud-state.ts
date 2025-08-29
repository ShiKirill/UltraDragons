import { useCallback, useState } from "react";

export interface CrudState<T> {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  editingItem: T | null;
  formData: Partial<T>;
}

export const useCrudState = <T extends { id?: string | number }>() => {
  const [state, setState] = useState<CrudState<T>>({
    isCreateOpen: false,
    isEditOpen: false,
    isDeleteOpen: false,
    editingItem: null,
    formData: {},
  });

  const openCreate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCreateOpen: true,
      formData: {},
    }));
  }, []);

  const openEdit = useCallback((item: T) => {
    setState((prev) => ({
      ...prev,
      isEditOpen: true,
      editingItem: item,
      formData: { ...item },
    }));
  }, []);

  const openDelete = useCallback((item: T) => {
    setState((prev) => ({
      ...prev,
      isDeleteOpen: true,
      editingItem: item,
      formData: { ...item },
    }));
  }, []);

  const closeModals = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isCreateOpen: false,
      isEditOpen: false,
      isDeleteOpen: false,
      editingItem: null,
      formData: {},
    }));
  }, []);

  const updateFormData = useCallback((updates: Partial<T>) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  const setFormData = useCallback((data: Partial<T>) => {
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
