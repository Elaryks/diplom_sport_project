export type RegulationFilter = {
  useContext ?: boolean;
  withContentId ?: number;
  withContextForUserId ?: number;
  name ?: string;
  currentStatusKey ?: number;
  isStudied ?: boolean;
  sectionId ?: number;
  forApproval ?: boolean;
  createdByUserId ?: number;
  hasDraftContent ?: boolean;
  hasActiveContent ?: boolean;
}