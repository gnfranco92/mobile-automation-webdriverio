const execSync = require('child_process').execSync;

const platform = process.env.PLATFORM || 'android'; // Define a plataforma com base na variável de ambiente
const isCI = process.env.CI_ENV === 'browserstack'; // Detecta se está rodando no BrowserStack

const capabilities = [];

let deviceName = 'auto';
if (!isCI) {
    try {
        const devices = execSync('adb devices')
            .toString()
            .split('\n')
            .slice(1)
            .map(line => line.split('\t')[0])
            .filter(line => line !== '');

        if (devices.length > 0) {
            deviceName = devices[0]; // Usa o primeiro dispositivo encontrado
        }
    } catch (err) {
        console.error('Erro ao buscar dispositivos via ADB:', err);
    }
}

if (platform === 'android') {
    capabilities.push({
        platformName: 'Android',
        'appium:deviceName': isCI ? 'Samsung Galaxy S23' : deviceName, // Define dispositivo diferente para BrowserStack
        'appium:automationName': 'UiAutomator2',
        'appium:app': isCI ? 'bs://<APP_ID>' : './app/android/android.wdio.native.app.v1.0.8.apk', // Usa app no BrowserStack se estiver em CI
        ...(isCI && {
            'browserstack.user': process.env.BROWSERSTACK_USER,
            'browserstack.key': process.env.BROWSERSTACK_KEY,
            'appium:platformVersion': '13.0'
        })
    });
} else if (platform === 'ios') {
    capabilities.push({
        platformName: 'iOS',
        'appium:deviceName': isCI ? 'iPhone 14' : 'auto', // Define dispositivo para BrowserStack
        'appium:automationName': 'XCUITest',
        'appium:app': isCI ? 'bs://<APP_ID>' : './app/os.simulator.wdio.native.app.v1.0.8.zip', // Usa app no BrowserStack se estiver em CI
        ...(isCI && {
            'browserstack.user': process.env.BROWSERSTACK_USER,
            'browserstack.key': process.env.BROWSERSTACK_KEY,
            'appium:platformVersion': '16.0'
        })
    });
}

exports.config = {
    runner: 'local',
    path: '/wd/hub',
    port: 4723,
    specs: ['./tests/features/**/*.feature'],
    maxInstances: 1,
    capabilities: capabilities,
    logLevel: 'info',
    framework: 'cucumber',
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
    cucumberOpts: {
        require: ['./tests/stepDefinitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};