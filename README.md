# API de Operações Financeiras - Teste Cubos Tecnologia 

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![exemplo imagem](https://vagas.byintera.com/wp-content/uploads/2022/08/cubos_newLogo.png)

> ## **Desenvolvido em: NodeJS, TypeScript, ExpressJS, PostgresSQL, TypeORM e Docker.**
>
> Contato: Sávio Pinho Nunes - saviopinhonunes@gmail.com - +55 85 997191702.

## ✅ Funcionalidades
- Criar uma pessoa.
- Autenticar uma pessoa.
- Adicionar e listar cartões de uma conta.
- Adicionar e listar contas da pessoa.
- Realizar e listar transações em uma conta.
- Consultar o saldo de uma conta.
- Realizar transferência interna entre contas.
- Reverter uma transação.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

* Ter o Docker instalado e rodando para que seja criada a base de dados dessa aplicação. (Procurar fechar todos os serviços e containeres que já estiverem rodando para evitar conflito de portas)
* NodeJS Instalado na máquina.

## 🚀 Instalação

Para instalação e funcionamento, siga estas etapas:

### Clonar Projeto
```
git clone https://github.com/saviopinho/Node-API-Cubos-Typescript.git
```

## Configurar Variáveis de Ambiete
O arquivo .env já está preenchido com os dados necessários para o funcionamento padrão.

### Acessar raiz do projeto
```
cd Node-API-Cubos-Typescript
```

### Instalar Packages
```
npm install
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

* Em caso de conflito de portas ao executar o comando docker compose, realizar todo o processo do início, porém alterando o .env para as portas que estarão disponíveis
* Usar a ferramenta de sua preferência para testar as rotas e os endpoints criados
