export type Command<T> = {
  name: string;
  args: T;
}

export type UpdateRequirement = {
    configurationId?: string;
    nodeId: string;
    value: number;
    isSelection: boolean;
    ignoreConflicts?: boolean;
}

export type UpdateRequirements = {
    configurationId: string;
    ignoreConflicts: boolean;
    includeSearchbarResults: boolean;
    requirements: UpdateRequirement[];
}

export type UpdateImageValue = {
    configurationId: string;
    nodeId: string;
    image: string;
}

export type UpdateTextValue = {
    configurationId: string;
    nodeId: string;
    value: string;
}

export type UpdateLinkedConfigurationCardinality = {
    configurationId: string;
    parentNodeId: string;
    cardinality: number;
    configurationCode?: string;
}

export type RemoveLinkedConfiguration = {
    linkedConfigurationId: string;
}

/**
 * Options for initializing the third-party visualization.
 */
export interface VisualizationFrameOptions {
  /**
   * The container to render the iframe element in. Accepts either a HTMLElement or a query selector string.
   */
  container: HTMLElement | string;

  /**
   * The URL where the third party visualization client is hosted.
   */
  url: string;
}
