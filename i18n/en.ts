import { langKeyType } from './keys';

export const en: { [key in langKeyType]: string } = {
  FAILED_TO_PUSH_TOKEN: 'Failed to get push token for push notification!',
  MUST_USE_PHYSICAL_DEVICE: 'Must use physical device for Push Notifications',
  RESET: 'Reset',
  ARE_YOU_SURE_TO_RESET_APP: 'Are you sure to reset app to factory settings? All stored data will be cleared.',
};
