// Handles sending events to the iframe.

import { ViewerEvent } from './viewer-event';
import {
  UpdateRequirement,
  UpdateRequirements,
  UpdateImageValue,
  UpdateTextValue,
  UpdateLinkedConfigurationCardinality,
  RemoveLinkedConfiguration,
} from './models';
import { ConfigurationFeature } from '@elfsquad/configurator';

export class EventSender {
  private readonly targetWindow: Window;

  constructor(targetWindow: Window) {
    this.targetWindow = targetWindow;
  }

  /**
   * Send a triggerConfigurationUpdate event to the iframe.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendTriggerConfigurationUpdate();
   * ```
   */
  public sendTriggerConfigurationUpdate(): void {
    this.sendMessage(ViewerEvent.TriggerConfigurationUpdate, {});
  }

  /**
   * Send an updateRequirement event to the iframe.
   *
   * @param data - The UpdateRequirement payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendUpdateRequirement({
   *   configurationId: '00000000-0000-0000-0000-000000000000',
   *   nodeId: '00000000-0000-0000-0000-000000000000',
   *   value: 10,
   *   isSelection: true,
   *   ignoreConflicts: false,
   * });
   * ```
   */
  public sendUpdateRequirement(data: UpdateRequirement): void {
    this.sendMessage(ViewerEvent.UpdateRequirement, data);
  }

  /**
   * Send a dragStarted event to the iframe.
   *
   * @param data - The ConfigurationFeature payload.
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendDragStarted(feature);
   * ```
  */
  public sendDragStarted(data: ConfigurationFeature): void {
    this.sendMessage(ViewerEvent.DragStarted, data);
  }

  /**
   * Send an updateRequirements event to the iframe.
   *
   * @param data - The UpdateRequirements payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendUpdateRequirements({
   *   configurationId: '00000000-0000-0000-0000-000000000000',
   *   ignoreConflicts: false,
   *   includeSearchbarResults: true,
   *   requirements: [
   *     {
   *       nodeId: '00000000-0000-0000-0000-000000000000',
   *       value: 10,
   *       isSelection: true,
   *       ignoreConflicts: false,
   *     },
   *   ],
   * });
   * ```
   */
  public sendUpdateRequirements(data: UpdateRequirements): void {
    this.sendMessage(ViewerEvent.UpdateRequirements, data);
  }

  /**
   * Send an updateImageValue event to the iframe.
   *
   * @param data - The UpdateImageValue payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendUpdateImageValue({
   *   configurationId: '00000000-0000-0000-0000-000000000000',
   *   nodeId: '00000000-0000-0000-0000-000000000000',
   *   // base64 encoded image
   *   image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAFwF52RAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvElEQVQ4jZ2Sv0vDUBiGn2V
   * });
   * ```
   */
  public sendUpdateImageValue(data: UpdateImageValue): void {
    this.sendMessage(ViewerEvent.UpdateImageValue, data);
  }

  /**
   * Send an updateTextValue event to the iframe.
   *
   * @param data - The UpdateTextValue payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendUpdateTextValue({
   *   configurationId: '00000000-0000-0000-0000-000000000000',
   *   nodeId: '00000000-0000-0000-0000-000000000000',
   *   value: 'Custom text value',
   * });
   * ```
   */
  public sendUpdateTextValue(data: UpdateTextValue): void {
    this.sendMessage(ViewerEvent.UpdateTextValue, data);
  }

  /**
   * Send an updateLinkedConfigurationCardinality event to the iframe.
   *
   * @param data - The UpdateLinkedConfigurationCardinality payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendUpdateLinkedConfigurationCardinality({
   *   parentNodeId: '00000000-0000-0000-0000-000000000000',
   *   cardinality: 2,
   *   configurationCode: 'XYAZIQWP'
   * });
   * ```
   */
  public sendUpdateLinkedConfigurationCardinality(
    data: UpdateLinkedConfigurationCardinality
  ): void {
    this.sendMessage(ViewerEvent.UpdateLinkedConfigurationCardinality, data);
  }

  /**
   * Send a removeLinkedConfiguration event to the iframe.
   *
   * @param data - The RemoveLinkedConfiguration payload.
   *
   * @example
   * ```typescript
   * const iframe = document.querySelector('iframe');
   * const eventSender = new EventSender(iframe.contentWindow!);
   * eventSender.sendRemoveLinkedConfiguration({
   *   linkedConfigurationId: '00000000-0000-0000-0000-000000000000',
   * });
   * ```
   */
  public sendRemoveLinkedConfiguration(data: RemoveLinkedConfiguration): void {
    this.sendMessage(ViewerEvent.RemoveLinkedConfiguration, data);
  }

  /**
   * Internal method to send a message to the iframe.
   *
   * @param eventName - The name of the event.
   * @param data - The data payload to send.
   */
  private sendMessage(eventName: string, data: any): void {
    this.targetWindow.postMessage(
      {
        name: eventName,
        args: this.sanitizeData(data),
      },
      '*'
    );
  }

  /**
   * Sanitize the data payload by removing non-serializable properties.
   *
   * @param data - The data payload to sanitize.
   * @returns The sanitized data.
   */
  private sanitizeData(data: any): any {
    const cleanData = { ...data };
    // Remove methods or non-serializable properties
    Object.keys(cleanData).forEach((key) => {
      if (typeof cleanData[key] === 'function') {
        delete cleanData[key];
      }
    });
    return cleanData;
  }
}
