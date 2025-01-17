Projeto de Testes Cucumber para Atualização de Aplicativo Electron

Este projeto demonstra como testar a funcionalidade de atualização automática de um aplicativo Electron usando o framework de testes Behavior-Driven Development (BDD) Cucumber.js, juntamente com Sinon para mocks e Chai para asserções.

## Funcionalidades Testadas

*   Verificação de disponibilidade de novas versões.
*   Processo de download e execução da atualização.
*   Tratamento de erros durante a verificação e o download.
*   Comportamento em diferentes cenários (aplicativo empacotado ou não).

## Tecnologias Utilizadas

*   **Electron:** Framework para construção de aplicativos desktop multiplataforma com JavaScript, HTML e CSS.
*   **Node.js:** Ambiente de execução JavaScript.
*   **Cucumber.js:** Framework BDD para testes de aceitação.
*   **Chai:** Biblioteca de asserções para testes JavaScript.
*   **Sinon:** Biblioteca para mocks e stubs.
*   **Rewire:** Biblioteca para injetar dependências e stubar módulos.
*   **node-fetch:** Para realizar requisições HTTP nos testes.

## Pré-requisitos

*   Node.js (versão LTS recomendada)
*   npm ou yarn

## Instalação

1.  Clone o repositório:

```bash
git clone [https://github.com/offline0x33/FuryTigris-Minecraft.git](https://github.com/offline0x33/FuryTigris-Minecraft.git)
```

2.  Navegue até o diretório do projeto:

```bash
cd SEU_REPOSITORIO
```

3.  Instale as dependências:

```bash
yarn install # ou npm install
```

## Executando os Testes

Para executar os testes Cucumber, utilize o seguinte comando:

```bash
yarn test # ou npm run test