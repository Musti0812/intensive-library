import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CheckoutFormData } from "@/types";
import {
  checkinLibraryItem,
  checkoutLibraryItem,
  deleteLibraryItem,
  getLibraryItems,
  getLibraryItemTypes,
  saveLibraryItem,
} from "@/services/libraryService";

const LIBRARY_ITEMS_QUERY_KEY = ["libraryItems"];
const LIBRARY_ITEM_TYPES_QUERY_KEY = ["libraryItemTypes"];

function useLibraryItems() {
  const libraryItemsQuery = useQuery({
    queryKey: LIBRARY_ITEMS_QUERY_KEY,
    queryFn: async () => {
      const response = await getLibraryItems();
      return response.data;
    },
  });

  return {
    libraryItems: libraryItemsQuery.data ?? [],
    isLoading: libraryItemsQuery.isLoading,
    isError: libraryItemsQuery.isError,
  };
}

export function useLibraryItemTypes() {
  const libraryItemTypesQuery = useQuery({
    queryKey: LIBRARY_ITEM_TYPES_QUERY_KEY,
    queryFn: async () => {
      const response = await getLibraryItemTypes();
      return response.data;
    },
  });

  return {
    libraryItemTypes: libraryItemTypesQuery.data ?? [],
    isLoading: libraryItemTypesQuery.isLoading,
    isError: libraryItemTypesQuery.isError,
  };
}

export function useSaveLibraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIBRARY_ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteLibraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIBRARY_ITEMS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCheckoutLibraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      checkout,
    }: {
      id: string;
      checkout: CheckoutFormData;
    }) => checkoutLibraryItem(id, checkout),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIBRARY_ITEMS_QUERY_KEY });
    },
  });
}

export function useCheckinLibraryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkinLibraryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIBRARY_ITEMS_QUERY_KEY });
    },
  });
}

export default useLibraryItems;
