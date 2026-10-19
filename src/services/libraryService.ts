import type {
  CheckoutFormData,
  LibraryItem,
  LibraryItemFormData,
  LibraryItemType,
} from "@/types";
import axios from "axios";

const API_BASEURL = "https://intensive-library-backend-gffl.onrender.com/api/libraryitems"
// const API_BASEURL = "http://localhost:2277/api/libraryitems";

function libraryItemUrl(id?: string) {
  if (id) return `${API_BASEURL}/${id}`;

  return API_BASEURL;
}

export function getLibraryItems() {
  return axios.get<LibraryItem[]>(libraryItemUrl());
}

export function getLibraryItem(id: string) {
  return axios.get<LibraryItem>(libraryItemUrl(id));
}

export function getLibraryItemTypes() {
  return axios.get<LibraryItemType[]>(`${API_BASEURL}/types`);
}

export function saveLibraryItem(libraryItem: LibraryItemFormData) {
  if (libraryItem.id) {
    return axios.put<LibraryItem>(libraryItemUrl(libraryItem.id), libraryItem);
  }

  return axios.post<LibraryItem>(libraryItemUrl(), libraryItem);
}

export function deleteLibraryItem(id: string) {
  return axios.delete<LibraryItem>(libraryItemUrl(id));
}

export function checkoutLibraryItem(id: string, checkout: CheckoutFormData) {
  return axios.post<LibraryItem>(`${libraryItemUrl(id)}/checkout`, checkout);
}

export function checkinLibraryItem(id: string) {
  return axios.post<LibraryItem>(`${libraryItemUrl(id)}/checkin`);
}

export default {
  getLibraryItems,
  getLibraryItem,
  getLibraryItemTypes,
  saveLibraryItem,
  deleteLibraryItem,
  checkoutLibraryItem,
  checkinLibraryItem,
};
