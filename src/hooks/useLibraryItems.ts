import { useEffect, useState } from "react";
import { getLibraryItems } from "@/services/libraryService";
import type { LibraryItem } from "@/types";

function useLibraryItems() {
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);

  async function loadLibraryItems() {
    try {
      const response = await getLibraryItems();
      setLibraryItems(response.data);
    } catch (error) {
      console.log("Could not load library items.", error);
    }
  }

  useEffect(() => {
    loadLibraryItems();
  }, []);

  return { libraryItems, loadLibraryItems };
}

export default useLibraryItems;
