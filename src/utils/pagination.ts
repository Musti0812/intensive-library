export function paginate<T>(items: T[], pageSize: number, selectedPage: number) {
  const startIndex = pageSize * (selectedPage - 1);
  const endIndex = pageSize * selectedPage;

  return items.slice(startIndex, endIndex);
}
