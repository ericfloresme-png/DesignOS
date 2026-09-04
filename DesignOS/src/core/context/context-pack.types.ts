export interface ContextPack {
  readonly systemId: string;
  readonly specId: string;
  readonly requirementIds: readonly string[];
  readonly taskId: string;
  readonly constraints: readonly string[];
  readonly relevantFilePaths: readonly string[];
  readonly relatedTestIds: readonly string[];
  readonly relatedIssueIds: readonly string[];
  readonly relevantKnowledgeIds: readonly string[];
  readonly currentVersionId: string | null;
}
