export const AppConstants = {
    PRODUCT_NAME: 'XACBank- Micro App Dashboard',
    AUTH_DATA: {
        HEADERS: {
            APP_JSON_CONTENT_TYPE: 'application/json',
            CORS: '*',
            IDEMPOTENCY_KEY: 'xyz'
        },
        TOKEN: 'token',
        SESSION_ID: 'session',
        AUTH_DETAILS: 'authDetails',
        EXPITRED_AT: 'expires_at'
    },
    API_ENDPOINTS: {
        AUTH: {
            GET_TOKEN: '/getToken/v1',
        },
        NEW_PAYEE:{
            ADD_PAYEE: '/payees/v1',
        },
        FUND_TRANSFER:{
            NEFT_TRANSFER: '/fundtransfer/v1',
        }

    },
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        MAX_SUCCESS_CODE: 206,
        APZ_CODE: {
            USER_ID_EXIST: 'APZ_EXP_001',
            PSWD_EXP: 'APZ_EXP_003'
        }
    },
    APP_URLS: {
        MAIN_URL: 'app-dashboard',
        SUB_URLS: {
            DASHBOARD: 'dashboard',
            FUND_TRANSFER: 'fund-transfer',
            NEW_PAYEE: 'new-payee',
            OTHER_BANK: 'other-bank',
            NEFT_FUND_TRANSFER: 'neft-transfer'
       }
    },
    HTTP_MESSAGE_TYPE: {
        WARN: 'WARN',
        ERROR: 'ERROR',
        CONFIRM: 'CONFIRM',
        INFO: 'INFO',
        SUCCESS: 'SUCCESS',
        FAIL: 'FAIL'
    },
    ALERT_TYPE: {
        SUCCESS: 'success',
        ERROR: 'error',
        WARN: 'warning',
        INFO: 'info',
        DANGER: 'danger',
        PRIMARY: 'primary'
    },
    LANGUAGES: {
        mn: 'монгол',
        en: 'english'
    },
    API_URLS_SHOWING_INLINE_MESSAGES: []
};
