export interface Command<T> {
  name: string;
  args: T;
}

export interface UpdateRequirement {
    /*
     * Configuration to update. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId?: string;

    /*
     * The node to update.
    */
    nodeId: string;

    /*
     * The value to set.
    */
    value: number;

    /*
     * Whether the requirement is a selection requirement or not.
    */
    isSelection: boolean;

    /*
     * Whether Elfsquad should try to automatically resolve conflicts or not.
    */
    ignoreConflicts?: boolean;
}

export interface UpdateRequirements {
    /*
     * The configuration to update. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId?: string;

    /*
     * Whether Elfsquad should try to automatically resolve conflicts or not.
    */
    ignoreConflicts: boolean;
    includeSearchbarResults: boolean;

    requirements: UpdateRequirement[];
}

export interface UpdateImageValue {
    /*
     * The configuration to update. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId: string;

    /*
     * The node to update
    */
    nodeId: string;

    /*
     * The image to set, base64 encoded.
    */
    image: string;
}

export interface UpdateTextValue {
    /*
     * The configuration to update. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId: string;

    /*
     * The node to update.
    */
    nodeId: string;

    /*
     * The text value to set.
    */
    value: string;
}

export interface UpdateLinkedConfigurationCardinality {
    /*
     * The parent configuration id. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId?: string;
    parentNodeId: string;
    cardinality: number;
    configurationCode?: string;
}

export interface RemoveLinkedConfiguration {
    /*
     * The parent configuration id. If not provided, the configuration is assumed to be the root configuration.
    */
    configurationId?: string;
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
