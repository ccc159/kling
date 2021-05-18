import i18n from 'i18n-js';
import { langKeyType } from './keys';

export function t(key: langKeyType): string {
  return i18n.t(key);
}
