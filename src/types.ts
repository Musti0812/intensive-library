export type Category = {
  id: string;
  name: string;
  itemsCount: number;
};

export type CategoryFormData = {
  id?: string;
  name: string;
};

export type LibraryItemType = {
  id: string;
  name: string;
};

export type LibraryItem = {
  id: string;
  title: string;
  acronym?: string
  libraryItemTypeId: string;
  libraryItemType: LibraryItemType;
  categoryId: string;
  category: Category;
  isBorrowable: boolean;
  borrower?: string
  borrowDate?: string
  dueDate?: string
  author?: string
  nbrPages?: number
  runTimeMinutes?: number
};

export type LibraryItemFormData = {
  id?: string;
  title: string;
  acronym?: string;
  libraryItemTypeId: string;
  categoryId: string;
  isBorrowable: boolean;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
};

export type CheckoutFormData = {
  borrower: string;
};

export type SortColumn = {
  path: string;
  order: "asc" | "desc";
};
