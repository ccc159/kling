/**
 * Put all keys in the langKeyList
 */

// prettier-ignore
export const langKeyList = [
    "FAILED_TO_PUSH_TOKEN",
    "MUST_USE_PHYSICAL_DEVICE",
    "RESET",
    "ARE_YOU_SURE_TO_RESET_APP",
    "CANCEL",
    "ABOUT",
    "APP_DESCRIPTION",
    "VERSION",
    "WEBSITE",
    "PRIVACY_POLICY",
    "RESET_APP",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "STATISTICS",
    "TEST_MAP",
    "TEST_RESULT_ON_DATE",
    "TEST",
    "NEGATIVE",
    "POSITIVE",
    "INVALID"
] as const;

// defines type
export type langKeyType = typeof langKeyList[number];
type langKeysType = { [key in langKeyType]: key };

// create a typed object for intellisense
export const langKeys: langKeysType = langKeyList.reduce<langKeysType>((acc, type) => ({ ...acc, [type]: type }), {} as any);
