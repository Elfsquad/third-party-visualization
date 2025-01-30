// Handles commands send from the iframe.

import { ViewerEvent } from './viewer-event';
import {
  UpdateRequirement,
  UpdateRequirements,
  UpdateImageValue,
  UpdateTextValue,
  UpdateLinkedConfigurationCardinality,
  RemoveLinkedConfiguration,
  Command
} from './models';

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

    this.registerEventListener(w, ViewerEvent.UpdateLinkedConfigurationCardinality, (event) => {
      this.updateLinkedConfigurationCardinality(event);
    });

    this.registerEventListener(w, ViewerEvent.RemoveLinkedConfiguration, (event) => {
      this.removeLinkedConfiguration(event);
    });
  }

  protected abstract triggerConfigurationUpdate(event: MessageEvent): void;
  protected abstract updateRequirement(event: MessageEvent<Command<UpdateRequirement>>): void;
  protected abstract updateRequirements(event: MessageEvent<Command<UpdateRequirements>>): void;
  protected abstract updateImageValue(event: MessageEvent<Command<UpdateImageValue>>): void;
  protected abstract updateTextValue(event: MessageEvent<Command<UpdateTextValue>>): void;
  protected abstract updateLinkedConfigurationCardinality(event: MessageEvent<Command<UpdateLinkedConfigurationCardinality>>): void;
  protected abstract removeLinkedConfiguration(event: MessageEvent<Command<RemoveLinkedConfiguration>>): void;

  private registerEventListener(
    w: Window,
    key: string,
    callback: (data: MessageEvent) => void
  ): void {
    w.addEventListener('message', (event: MessageEvent) => {
      if (event.data?.name === key) callback(event);
    });
  }
}
