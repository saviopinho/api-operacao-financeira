import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Operações Financeiras CUBOS',
            version: '1.0.0',
            customSiteTitle: 'API Operações Financeiras Cubos',
        },
        servers: [
            {
                url: `http://localhost:${process.env.EXTERNAL_PORT}`,
                description: 'Servidor Desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                postPeopleRequest: {
                    type: 'object',
                    required: ['name', 'document', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'User name',
                        },
                        document: {
                            type: 'string',
                            description: 'User document number',
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                        },
                    },
                    example: {
                        name: 'Carolina Rosa Marina Barros',
                        document: '569.679.155-76',
                        password: 'senhaforte',
                    },
                },
                postPeopleResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'name',
                        'document',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        name: {
                            type: 'string',
                            description: 'User name',
                        },
                        document: {
                            type: 'string',
                            description: 'User document number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: {
                        id: '4ca336a9-b8a5-4cc6-8ef8-a0a3b5b45ed7',
                        name: 'Carolina Rosa Marina Barros',
                        document: '56967915576',
                        createdAt: '2022-08-01T14:30:41.203653',
                        updatedAt: '2022-08-01T14:30:41.203653',
                    },
                },
                getLoginRequest: {
                    type: 'object',
                    required: ['document', 'password'],
                    properties: {
                        document: {
                            type: 'string',
                            description: 'User document number',
                        },
                        password: {
                            type: 'string',
                            description: 'User password',
                        },
                    },
                    example: {
                        document: '56967915576',
                        password: 'senhaforte',
                    },
                },
                getLoginResponse: {
                    type: 'object',
                    required: ['token'],
                    properties: {
                        token: {
                            type: 'string',
                            description: 'Access Token',
                        },
                    },
                    example: {
                        token: 'Bearer ',
                    },
                },
                postAccountsRequest: {
                    type: 'object',
                    required: ['branch', 'account'],
                    properties: {
                        branch: {
                            type: 'string',
                            description: 'User name',
                        },
                        account: {
                            type: 'string',
                            description: 'User document number',
                        },
                    },
                    example: {
                        branch: '001',
                        account: '2033392-5',
                    },
                },
                postAccountsResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'branch',
                        'account',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Account ID',
                        },
                        branch: {
                            type: 'string',
                            description: 'Account branch',
                        },
                        account: {
                            type: 'string',
                            description: 'Account number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: {
                        id: 'b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f',
                        branch: '001',
                        account: '2033392-5',
                        createdAt: '2022-08-01T14:30:41.203653',
                        updatedAt: '2022-08-01T14:30:41.203653',
                    },
                },
                getAccountsResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'branch',
                        'account',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Account ID',
                        },
                        branch: {
                            type: 'string',
                            description: 'Account branch',
                        },
                        account: {
                            type: 'string',
                            description: 'Account number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: [
                        {
                            id: '48bb7773-8ccc-4686-83f9-79581a5e5cd8',
                            branch: '001',
                            account: '2033392-5',
                            createdAt: '2022-08-01T14:30:41.203653',
                            updatedAt: '2022-08-01T14:30:41.203653',
                        },
                    ],
                },
                postAccountCardRequest: {
                    type: 'object',
                    required: ['type', 'number', 'cvv'],
                    properties: {
                        type: {
                            type: 'string',
                            description: 'Card type',
                        },
                        number: {
                            type: 'string',
                            description: 'Card number',
                        },
                        cvv: {
                            type: 'string',
                            description: 'Cvv number',
                        },
                    },
                    example: {
                        type: 'virtual',
                        number: '5179 7447 8594 6978',
                        cvv: '512',
                    },
                },
                postAccountCardResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'type',
                        'number',
                        'cvv',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Card ID',
                        },
                        type: {
                            type: 'string',
                            description: 'Card branch',
                        },
                        number: {
                            type: 'string',
                            description: 'Card number',
                        },
                        cvv: {
                            type: 'string',
                            description: 'Cvv number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: {
                        id: 'b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f',
                        type: 'virtual',
                        number: '6978',
                        cvv: '512',
                        createdAt: '2022-08-01T14:30:41.203653',
                        updatedAt: '2022-08-01T14:30:41.203653',
                    },
                },
                getAccountCardsResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'type',
                        'number',
                        'cvv',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Card ID',
                        },
                        type: {
                            type: 'string',
                            description: 'Card type',
                        },
                        number: {
                            type: 'string',
                            description: 'Card number',
                        },
                        cvv: {
                            type: 'string',
                            description: 'cvv number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: [
                        {
                            id: '05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5',
                            type: 'physical',
                            number: '5179 7447 8594 6978',
                            cvv: '231',
                            createdAt: '2022-08-01T14:30:41.203653',
                            updatedAt: '2022-08-01T14:30:41.203653',
                        },
                        {
                            id: 'b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f',
                            type: 'virtual',
                            number: '1694 7283 2117 1325',
                            cvv: '512',
                            createdAt: '2022-08-01T14:30:41.203653',
                            updatedAt: '2022-08-01T14:30:41.203653',
                        },
                    ],
                },
                getCardsResponse: {
                    type: 'object',
                    required: [
                        'id',
                        'type',
                        'number',
                        'cvv',
                        'createdAt',
                        'updatedAt',
                    ],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Card ID',
                        },
                        type: {
                            type: 'string',
                            description: 'Card type',
                        },
                        number: {
                            type: 'string',
                            description: 'Card number',
                        },
                        cvv: {
                            type: 'string',
                            description: 'cvv number',
                        },
                        createdAt: {
                            type: 'string',
                            description: 'Creation time',
                        },
                        updatedAt: {
                            type: 'string',
                            description: 'Update time',
                        },
                    },
                    example: {
                        cards: [
                            {
                                id: '05a0ab2d-5ece-45b6-b7d3-f3ecce2713d5',
                                type: 'physical',
                                number: '0423',
                                cvv: '231',
                                createdAt: '2022-08-01T14:30:41.203653',
                                updatedAt: '2022-08-01T14:30:41.203653',
                            },
                            {
                                id: 'b0a0ec35-6161-4ebf-bb4f-7cf73cf6448f',
                                type: 'virtual',
                                number: '6978',
                                cvv: '512',
                                createdAt: '2022-08-01T14:30:41.203653',
                                updatedAt: '2022-08-01T14:30:41.203653',
                            },
                        ],
                        pagination: {
                            itemsPerPage: 2,
                            currentPage: 2,
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
