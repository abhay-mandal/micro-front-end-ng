export const AppConstants = {
    PRODUCT_NAME: 'XACBank- Micro App Login',
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
            LOGIN: '/userLogin/v1',
            REGISTERATION: '/userRegister/v1',
            CHANGE_PSWD: '/userChangePassword/v1'
        }
    },
    STATUS_CODE: {
        SUCCESS: 200,
        CREATED: 201,
        MAX_SUCCESS_CODE: 206,
        APZ_CODE: {
            USER_ID_EXIST: 'APZ_EXP_001',
            INVALID_CREDENTIALS: 'APZ_EXP_002',
            PSWD_EXP: 'APZ_EXP_003'
        }
    },
    APP_URLS: {
        MAIN_URL: 'app-login',
        SUB_URLS: {
            LOGIN: 'login',
            FORGOT_USER_NAME: 'forgot-username',
            FORGOT_PSWD: 'forgot-password',
            REGISTERATION: 'register',
            CHANGE_PSWD: 'change-password',
            OPEN_NEW_ACCOUNT: 'open-new-account'
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
    API_URLS_SHOWING_INLINE_MESSAGES: [],
    LANGUAGES: {
        mn: 'монгол',
        en: 'english'
    },
    DEFAULT_LANGUAGE: 'en',
    PASSWORD_STRENGTH_COLORS: {
        STRONG_PASSWORD_COLOR: 'green',
        MEDIUM_PASSWORD_COLOR: 'orange',
        WEAK_PASSWORD_COLOR: 'red'
    }
};


