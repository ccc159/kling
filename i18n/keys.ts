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
    "INVALID",
    "Negative",
    "Positive",
    "Invalid",
    "TESTS",
    "TIME_UP",
    "TEST_IS_READY_TO_PROCEED",
    "TEST_EXPIRED",
    "TEST_IS_EXPIRED",
    "NAME_OF_THE_TEST_PERSON",
    "MAKE_SURE_TO_PUT_INTO_TUBE",
    "NAME",
    "OK",
    "WAIT_A_MOMENT",
    "NOT_READY_YET",
    "READY_TO_PROCEED",
    "REMAINING_TIME",
    "CLOSE",
    "READY_TO_MAKE_DROPS",
    "SQUEEZE_4_DROPS_ON_WELL",
    "DONE",
    "FILL_RESULT",
    "WAHT_IS_RESULT",
    "CONFIRM",
    "EXPIRED_TEST",
    "THIS_TEST_IS_NOT_VALID_BECAUSE_EXPIRED",
    "STARTED",
    "ENDED",
    "INVALID_TEST",
    "TEST_INVALID_ACCORDING_TO_READ",
    "RESULT",
    "NO_END_DATE",
    "SETTING",
    "PHASE1_READY_MINUTES",
    "PHASE1_EXPIRE_MINUTES",
    "PHASE2_READY_MINUTES",
    "PHASE2_EXPIRE_MINUTES",
] as const;

// defines type
export type langKeyType = typeof langKeyList[number];
type langKeysType = { [key in langKeyType]: key };

// create a typed object for intellisense
export const langKeys: langKeysType = langKeyList.reduce<langKeysType>((acc, type) => ({ ...acc, [type]: type }), {} as any);