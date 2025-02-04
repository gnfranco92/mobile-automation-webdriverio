const path = require('path');
const execSync = require('child_process').execSync;
const fs = require('fs');

const platform = process.env.PLATFORM || 'android';
const isCI = process.env.CI_ENV === 'browserstack';

const capabilities = [];

// 🔥 Obtemos o bundleId correto para cada plataforma
const bundleId = platform === 'android' 
    ? 'com.example.android'  // Substitua pelo bundleId do seu app Android
    : 'com.example.ios';     // Substitua pelo bundleId do seu app iOS

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
            deviceName = devices[0];
        } else {
            console.warn('Nenhum dispositivo encontrado! Certifique-se de que um emulador ou dispositivo físico está conectado.');
        }
    } catch (err) {
        console.error('Erro ao buscar dispositivos via ADB:', err);
    }
}

// 🔥 Corrige os caminhos dos arquivos do app
const androidAppPath = path.resolve(__dirname, 'app/android/android.wdio.native.app.v1.0.8.apk');
const iosAppPath = path.resolve(__dirname, 'app/os.simulator.wdio.native.app.v1.0.8.zip');

if (!fs.existsSync(androidAppPath)) {
    console.error(`❌ ERRO: O arquivo APK não foi encontrado no caminho: ${androidAppPath}`);
} else {
    console.log(`✅ APK encontrado: ${androidAppPath}`);
}

if (platform === 'android') {
    capabilities.push({
        platformName: 'Android',
        'appium:deviceName': isCI ? 'Samsung Galaxy S23' : deviceName,
        'appium:automationName': 'UiAutomator2',
        'appium:app': isCI ? 'bs://<APP_ID>' : androidAppPath,
        'appium:appWaitForLaunch': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        ...(isCI && {
            'browserstack.user': process.env.BROWSERSTACK_USER,
            'browserstack.key': process.env.BROWSERSTACK_KEY,
            'appium:platformVersion': '13.0'
        })
    });
} else if (platform === 'ios') {
    capabilities.push({
        platformName: 'iOS',
        'appium:deviceName': isCI ? 'iPhone 14' : 'auto',
        'appium:automationName': 'XCUITest',
        'appium:app': isCI ? 'bs://<APP_ID>' : iosAppPath,
        'appium:noReset': false,
        'appium:fullReset': false,
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
    },

    // 🚀 Melhorado: Reiniciar o App antes de cada cenário
    beforeScenario: async function () {
        console.log('♻️ Reiniciando o aplicativo antes do cenário...');
        try {
            await driver.terminateApp(bundleId); 
            await driver.pause(2000); // Aguarda o encerramento completo do app
            await driver.activateApp(bundleId); 
            console.log('✅ Aplicativo reiniciado com sucesso.');
        } catch (error) {
            console.error('❌ Erro ao reiniciar o aplicativo:', error);
        }
    },

    // 🚀 Melhorado: Garantir que o app seja fechado corretamente antes de seguir para o próximo cenário
    afterScenario: async function () {
        console.log('❌ Fechando o aplicativo após o cenário...');
        try {
            await driver.terminateApp(bundleId);

            // 🚨 Aguarda até que o app tenha sido realmente fechado
            await driver.waitUntil(
                async () => !(await driver.isAppInstalled(bundleId)),
                {
                    timeout: 5000,
                    timeoutMsg: 'O app não foi fechado corretamente!',
                }
            );

            console.log('✅ Aplicativo fechado com sucesso.');
        } catch (error) {
            console.error('❌ Erro ao fechar o aplicativo:', error);
        }
    },

    onComplete: async function () {
        console.log('✅ Execução de testes concluída!');
    }
};
