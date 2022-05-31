export type UserSelectionRule = {
  id ?: number
  roleId ?: number | null,
  rolePositionId ?: number;
  rolePositionType ?: 1 | 2;
  isExcluded : boolean;
}