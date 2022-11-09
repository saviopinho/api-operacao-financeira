const { people } = require('../../models');
const jwt = require('jsonwebtoken');
const {
    UnauthorizeError,
    ForbiddenError,
    NotFoundError,
} = require('../helper/ApiError');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        throw new ForbiddenError('A token is required for authentication');
    }

    let document = '';

    try {
        const jwt_decoded = jwt.verify(token, process.env.API_KEY);
        document = jwt_decoded.document;
    } catch (error) {
        throw new UnauthorizeError('Invalid Token');
    }

    const _people = await people.findOne({ where: { document } });

    if (!_people) {
        throw new NotFoundError(
            'Invalid Token. Token belongs to an User who was not found'
        );
    }

    res.document = document;
    next();
};

module.exports = verifyToken;
