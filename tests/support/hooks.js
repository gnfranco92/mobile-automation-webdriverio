const { Before, After } = require('@wdio/cucumber-framework');

Before(async () => {
    await driver.launchApp(); // Reinicia o aplicativo antes de cada cenário
});

After(async () => {
    await driver.closeApp(); // Fecha o aplicativo após cada cenário
});
