import { ConfigurationFeature } from '@elfsquad/configurator';
import {
  UpdateRequirement,
  UpdateRequirements,
  UpdateImageValue,
  UpdateTextValue,
  UpdateLinkedConfigurationCardinality,
  RemoveLinkedConfiguration
} from './models';

/**
 * Type definition for the triggerConfigurationUpdate callback.
 */
export type TriggerConfigurationUpdateCallback = () => void;

/**
 * Type definition for the updateRequirement callback.
 */
export type UpdateRequirementCallback = (data: UpdateRequirement) => void;

/**
 * Type definition for the updateRequirements callback.
 */
export type UpdateRequirementsCallback = (data: UpdateRequirements) => void;

/**
 * Type definition for the updateImageValue callback.
 */
export type UpdateImageValueCallback = (data: UpdateImageValue) => void;

/**
 * Type definition for the updateTextValue callback.
 */
export type UpdateTextValueCallback = (data: UpdateTextValue) => void;

/**
 * Type definition for the dragStarted callback.
 */
export type DragStartedCallback = (data: ConfigurationFeature) => void;

/**
 * Type definition for the updateLinkedConfigurationCardinality callback.
 */
export type UpdateLinkedConfigurationCardinalityCallback = (
  data: UpdateLinkedConfigurationCardinality
) => void;

/**
 * Type definition for the removeLinkedConfiguration callback.
 */
export type RemoveLinkedConfigurationCallback = (
  data: RemoveLinkedConfiguration
) => void;
