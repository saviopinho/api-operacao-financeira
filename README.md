# Nome do projeto

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![exemplo imagem](https://vagas.byintera.com/wp-content/uploads/2022/08/cubos_newLogo.png)

> ## **API de Operações Financeiras desenvolvido em: NodeJS, TypeScript, ExpressJS, PostgresSQL, TypeORM e Docker.**
>
> Contato: Sávio Pinho Nunes - saviopinhonunes@gmail.com - +55 85 997191702.

## Funcionalidades
- Criar uma pessoa.
- Autenticar uma pessoa.
- Adicionar e listar cartões de uma conta.
- Adicionar e listar contas da pessoa.
- Realizar e listar transações em uma conta.
- Consultar o saldo de uma conta.
- Realizer transfência interna entre contas.
- Reverter uma transação.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Ter o Docker instalado e rodando para que seja criada a base de dados dessa aplicação.
* NodeJS Instalado na máquina.

## 🚀 Instalação

Para instalar a o projeto da API, siga estas etapas:

### Clonar Projeto
```
git clone https://github.com/saviopinho/Node-API-Cubos-Typescript.git
```

## Configurar Variáveis de Ambiete
```
O arquivo .env já está preenchido com os dados necessários para o funcionamento padrão.
```

### Instalar Packages
```
npm run install
```

### Criar e subir container PostgresSQL com Docker
```
npm run docker:compose
```

### Criar arquivo de migrations do TypeORM
```
npm run migration:generate
```

### Executar as migrations do TypeORM
```
npm run migration:run
```
### Iniciar nosso servidor API 
* Caso queira rodar o servidor e testar manualmente
```
npm run start
```
* Caso queria rodar os testes de integração
```
npm run test
```

## ☕ Observações

* Caso o comando de executar as migrations nao funcione de primeira, fechar e abrir novamente o VSCode para recarregar os packages.
* Usar a ferramenta de sua preferência para testar as rotas e os endpoints criados.
