export const AppConstants = {
    PRODUCT_NAME: 'XACBank- Base App Login',
    APP_CONFIG: {
        CONFIGS: {
            'app-dashboard': {
                loaded: false,
                srcPath: 'http://127.0.0.1:8088/main-es2015.js',
                element: 'micro-app-dashboard',
                url: '#/app-dashboard/dashboard',
                container: 'appContainer'
            },
            'app-login': {
                loaded: false,
                srcPath: 'http://127.0.0.1:8089/main-es2015.js',
                element: 'micro-app-login',
                url: '#/app-login/login',
                container: 'loginContainer'
            }
        },
        APP_DASHBOARD: 'app-dashboard',
        APP_LOGIN: 'app-login'
    },
    ALERT_TYPE: {
        SUCCESS: 'success',
        ERROR: 'error',
        WARN: 'warning',
        INFO: 'info',
        DANGER: 'danger',
        PRIMARY: 'primary'
    },
    COUNTRY_LIST: {
        IND: 'India'
    }
};
