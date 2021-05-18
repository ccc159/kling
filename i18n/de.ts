import { langKeyType } from './keys';

export const de: { [key in langKeyType]: string } = {
  FAILED_TO_PUSH_TOKEN: 'Failed to get push token for push notification!',
  MUST_USE_PHYSICAL_DEVICE: 'Must use physical device for Push Notifications',
  RESET: 'Reset',
  ARE_YOU_SURE_TO_RESET_APP: 'Are you sure to reset app to factory settings? All stored data will be cleared.',
  ABOUT: 'About',
  CANCEL: 'Cancel',
  APP_DESCRIPTION:
    'This app is developed to help making batch quick tests easier. It is totally free and open source. It does not access or track any of your personal data. If you find this app helpful, please recommend it to others who might need it. Thanks! ❤️',
  VERSION: 'Version',
  WEBSITE: 'Website',
  PRIVACY_POLICY: 'Privacy Policy',
  RESET_APP: 'Reset App',
};
