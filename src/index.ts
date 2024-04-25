import { Configuration, ConfigurationStep } from '@elfsquad/configurator';

      //this.executeCallbacks(ViewerEvent.UpdateTextValue, event.data.args);
//
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

/**
 * Type definition for the triggerConfigurationUpdate callback.
 */
export type TriggerConfigurationUpdateCallback = () => void;

/**
 * Type definition for the updateRequirement callback.
 */
export type UpdateRequirementCallback = (data: { nodeId: string, value: string, isSelection: boolean }) => void;

/**
 * Type definition for the updateRequirements callback.
 */
export type UpdateRequirementsCallback = (data: { 
  ignoreConflicts: boolean,
  includeSearchbarResults: boolean,
  requirements: { nodeId: string, value: string, isSelection: boolean }[] 
}) => void;

/**
 * Type definition for the updateImageValue callback.
 */
export type UpdateImageValueCallback = (data: { nodeId: string, image: string }) => void;

/**
 * Type definition for the updateTextValue callback.
 */
export type UpdateTextValueCallback = (data: { nodeId: string, textValue: string }) => void;


export enum ViewerEvent {
  TriggerConfigurationUpdate = 'elfsquad.triggerConfigurationUpdated',
  UpdateRequirement = 'elfsquad.updateRequirement',
  UpdateRequirements = 'elfsquad.updateRequirements',
  UpdateImageValue = 'elfsquad.updateImageValue',
  UpdateTextValue = 'elfsquad.updateTextValue'
}

export abstract class EventHandler {
  public registerEventListeners(w: Window): void {
    this.registerEventListener(w, ViewerEvent.TriggerConfigurationUpdate, (event) => {
      this.triggerConfigurationUpdate(event);
    });

    this.registerEventListener(w, ViewerEvent.UpdateRequirement, (event) => {
      this.updateRequirement(event);
    });

    this.registerEventListener(w, ViewerEvent.UpdateRequirements, (event) => {
      this.updateRequirements(event);
    });

    this.registerEventListener(w, ViewerEvent.UpdateImageValue, (event) => {
      this.updateImageValue(event);
    });

    this.registerEventListener(w, ViewerEvent.UpdateTextValue, (event) => {
      this.updateTextValue(event);
    });
  }

  protected abstract triggerConfigurationUpdate(event: MessageEvent): void;
  protected abstract updateRequirement(event: MessageEvent): void;
  protected abstract updateRequirements(event: MessageEvent): void;
  protected abstract updateImageValue(event: MessageEvent): void;
  protected abstract updateTextValue(event: MessageEvent): void;

  private registerEventListener(w: Window, key: string, callback: (data: MessageEvent) => void): void {
    w.addEventListener('message', (event: MessageEvent) => {
      if (event.data?.name === key)
        callback(event);
    });
  }
}


/**
 * Class representing an Elfsquad Showroom instance.
 */
export class VisualizationFrame extends EventHandler {
  private readonly nativeElement: HTMLIFrameElement;
  private container: HTMLElement;

  private readonly callbacks: { [key: string]: ((data: any) => void)[] } = {};

  /**
   * Initializes a new instance of the the third-party visualization.
   *
   * @example
   * ```typescript
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * ```
   *
   * @param options - The options used to initialize the showroom.
   * @throws Will throw an error if the specified container is not found or is not an HTMLElement.
   * @throws Will throw an error if the native iframe element does not have a content window.
   * @returns A new instance of the VisualizationFrame  class.
   */
  constructor(options: VisualizationFrameOptions) {
    super();
    this.container = this.getContainer(options);
    this.nativeElement = this.render(options);
    this.registerEventListeners(window);
  }

  /**
   * Retrieves the native iframe element.
   *
   * @example
   * ```typescript
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * const iframe = visualization.getNativeElement();
   * ```
   * 
   * @returns The native iframe element.
   */
  public getNativeElement(): HTMLIFrameElement {
    return this.nativeElement;
  }

  /**
   * Registers a callback function to be invoked when a configuration update is triggered.
   *
   * @example
   * ```typescript
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * visualization.onTriggerConfigurationUpdate(data => {
   *  console.log('Update triggered. Please re-send the configuration');
   * });
   * ```
   *
   * @param callback - The callback function to be called when a configuration update is triggered.
   */
  public onTriggerConfigurationUpdate(callback: TriggerConfigurationUpdateCallback): void {
    this.addCallback(ViewerEvent.TriggerConfigurationUpdate, callback);
  }

  /**
   * Registers a callback function to be invoked when a requirement should be updated.
   *
   * @example
   * ```typescript
   * const updateRequirement = (data) => {
   *   // your update requirement logic here
   * };
   *  
   *
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * visualization.onUpdateRequirement(data => {
   *   updateRequirement(data);
   * });
   *
   * ```
   *
   * @param callback - The callback function to be called when a requirement should be updated.
   */
  public onUpdateRequirement(callback: UpdateRequirementCallback): void {
    this.addCallback(ViewerEvent.UpdateRequirement, callback);
  }

  /**
   * Registers a callback function to be invoked when multiple requirements should be updated.
   *
   * @example
   * ```typescript
   * const updateRequirements = (data) => {
   *   // your update requirements logic here
   * };
   *
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * visualization.onUpdateRequirements(data => {
   *   updateRequirements(data);
   * });
   * ```
   *
   * @param callback - The callback function to be called when multiple requirements should be updated.
   */
  public onUpdateRequirements(callback: UpdateRequirementsCallback): void {
    this.addCallback(ViewerEvent.UpdateRequirements, callback);
  }

  /**
   * Registers a callback function to be invoked when an image value should be updated.
   *
   * @example
   * ```typescript
   * const updateImageValue = (data) => {
   *   // your update image value logic here
   * };
   *
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * visualization.onUpdateImageValue(data => {
   *   updateImageValue(data);
   * });
   * ```
   *
   * @param callback - The callback function to be called when an image value should be updated.
   */
  public onUpdateImageValue(callback: UpdateImageValueCallback): void {
    this.addCallback(ViewerEvent.UpdateImageValue, callback);
  }

  /**
   * Registers a callback function to be invoked when a text value should be updated.
   *
   * @example
   * ```typescript
   * const updateTextValue = (data) => {
   *   // your update text value logic here
   * };
   *
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   * visualization.onUpdateTextValue(data => {
   *   updateTextValue(data);
   * });
   * ```
   *
   * @param callback - The callback function to be called when a text value should be updated.
   */ 
  public onUpdateTextValue(callback: UpdateTextValueCallback): void {
    this.addCallback(ViewerEvent.UpdateTextValue, callback);
  }

  /** 
   * Trigger a configuration update in the third-party visualization.
   *
   * @example
   * ```typescript
   * import { ConfiguratorContext, Configuration } from '@elfsquad/configurator';
   * const context = new ConfiguratorContext({ ... });
   *
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   *
   * context.onUpdate((evt: CustomEvent<Configuration>) => {
   *   visualization.triggerConfigurationUpdate(evt.detail);
   * });
   *  ```
   *
   * @param configuration - The configuration to send to the third-party visualization.
   */
  public sendConfigurationUpdated(configuration: Configuration): void {
    this.sendMessage('elfsquad.configurationUpdated', configuration);
  }

  /**
   * Trigger a step changed event in the third-party visualization.
   *
   * @example
   * ```typescript
   * const visualization = new VisualizationFrame ({ container: '#showroom', url: 'https://...' });
   *
   * const step = { ... };
   *
   * visualization.triggerStepChanged(step);
   * ```
   *
   * @param step - The step to send to the third-party visualization.
   */
  public sendStepChanged(step: ConfigurationStep): void {
    this.sendMessage('elfsquad.stepChanged', step);
  }

  private addCallback(key: ViewerEvent, callback: (data: any) => void): void {
    if (!this.callbacks[key])
      this.callbacks[key] = [];
    this.callbacks[key].push(callback);
  }

  private sendMessage(name: string, data: any): void {
    if (!this.nativeElement.contentWindow)
      throw new Error('Native element does not have a content window');

    this.nativeElement.contentWindow.postMessage({
      name: name,
      args: this.removeMethods(data)
    }, '*');
  }

  private removeMethods(data: any): any {
    const o = {};
    Object.assign(o, data);
    if ('_configuratorContext' in o) {
      delete o['_configuratorContext'];
    }
    return o;
  }

  protected triggerConfigurationUpdate(event: MessageEvent): void {
    this.executeCallbacks(ViewerEvent.TriggerConfigurationUpdate, event.data.args);
  }

  protected updateRequirement(event: MessageEvent): void {
    this.executeCallbacks(ViewerEvent.UpdateRequirement, event.data.args);
  }

  protected updateRequirements(event: MessageEvent): void {
    this.executeCallbacks(ViewerEvent.UpdateRequirements, event.data.args);
  }

  protected updateImageValue(event: MessageEvent): void {
    this.executeCallbacks(ViewerEvent.UpdateImageValue, event.data.args);
  }

  protected updateTextValue(event: MessageEvent): void {
    this.executeCallbacks(ViewerEvent.UpdateTextValue, event.data.args);
  }

  private executeCallbacks(key: ViewerEvent, data: any): void {
    if (!this.callbacks[key])
      return;

    this.callbacks[key].forEach(callback => {
      callback(data);
    });
  }

  private render(options: VisualizationFrameOptions): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = options.url;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.margin = '0';
    iframe.style.padding = '0';
    iframe.style.display = 'block';
    this.container.appendChild(iframe);
    return iframe;
  }

  /**
   * Determines the appropriate container for the iframe based on the provided options.
   * @param options - The options used to initialize the showroom, including the container specification.
   * @returns The resolved HTMLElement to use as the container.
   * @throws Will throw an error if the specified container is not found or is not an HTMLElement.
   */
  private getContainer(options: VisualizationFrameOptions): HTMLElement {
    if (typeof options.container === 'string') {
      const element = document.querySelector(options.container);
      if (!element) {
        throw new Error('Container not found');
      }
      if (!(element instanceof HTMLElement)) {
        throw new Error('Container must be an HTMLElement');
      }
      return element;
    }
    return options.container;
  }
}

