const { peopleRoute } = require('./src/tests/people');
const { loginRoute } = require('./src/tests/login');
const { accountsRoute } = require('./src/tests/accounts');
const { cardsRoute } = require('./src/tests/cards');

describe('Running tests sequentially', () => {
    peopleRoute;
    loginRoute;
    accountsRoute;
    cardsRoute;
});
