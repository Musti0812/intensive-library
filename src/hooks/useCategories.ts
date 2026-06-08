import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import type { Category } from "@/types";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function loadCategories() {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log("Could not load categories.", error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return { categories, loadCategories };
}

export default useCategories;
