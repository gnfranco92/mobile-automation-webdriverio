# Mobile Automation WebDriverIO

Projeto de automação de testes mobile utilizando **WebDriverIO, Appium e Cucumber**.

## 📌 Requisitos do Ambiente

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [Appium](https://appium.io/) (instalado globalmente)
- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (para Android)
- [Android SDK](https://developer.android.com/studio) (para execução em emuladores/dispositivos Android)
- [Xcode](https://developer.apple.com/xcode/) (para execução em iOS)
- [Git](https://git-scm.com/)

## 🚀 Configuração do Projeto

1️⃣ **Clone o repositório**

```sh
git clone https://github.com/SEU_USUARIO/mobile-automation-webdriverio.git
cd mobile-automation-webdriverio
```

2️⃣ **Instale as dependências**

```sh
npm install
```

3️⃣ **Adicione os arquivos do aplicativo** (APK para Android e IPA para iOS) na pasta:

```
app/
├── android/
│   ├── android.wdio.native.app.v1.0.8  # Arquivo do aplicativo Android
├── ios/
│   ├──./app/os.simulator.wdio.native.app.v1.0.8.zip  # Arquivo do aplicativo iOS
```

## 📱 Execução dos Testes

### 🔹 **Executar os testes no emulador Android**
```sh
npm run test:android
```

### 🔹 **Executar os testes no iOS (macOS obrigatório)**
```sh
npm run test:ios
```

### 🔹 **Executar os testes no BrowserStack (opcional)**
```sh
npm run test-browserstack
```

## 🛠 Configuração do Appium

Se ainda não tem o **Appium Server** rodando, inicie-o com o comando:

```sh
appium
```

Caso queira rodar uma versão específica:

```sh
npx appium@2.0
```

## 📊 Relatórios de Testes

Após a execução dos testes, gere o relatório **Allure**:

```sh
npm run report
```

E abra o relatório no navegador:

```sh
allure generate
allure open
```

## 🔄 CI/CD com GitHub Actions

O projeto já inclui um pipeline de **CI/CD com GitHub Actions**, que executa os testes automaticamente a cada commit.

Se estiver usando **GitLab CI/CD**, adapte o pipeline no `.gitlab-ci.yml`.

## 📚 Tecnologias Utilizadas

- **Linguagem:** JavaScript
- **Framework de Testes:** WebDriverIO + Cucumber
- **Serviço de Automação:** Appium
- **Gerenciador de Testes:** Mocha + Chai
- **Relatórios:** Allure Report
- **CI/CD:** GitHub Actions (adaptável para GitLab CI/CD)
- **Execução Remota:** BrowserStack

---

**Criado para facilitar a automação de testes mobile com WebDriverIO.** 🚀