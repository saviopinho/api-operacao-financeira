if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {
    BadRequestError,
    BadGatewayError,
    UnavailableServiceError,
    UnauthorizeError,
} = require('../helper/ApiError');

const { onlyNumbers } = require('../helper/Utils');
const axios = require('axios');

const _checkDocumentType = (document) => {
    if (document.length == 11) {
        return 'cpf';
    } else if (document.length == 14) {
        return 'cnpj';
    }

    throw new BadRequestError('Invalid CPF/CNPJ format');
};

const credentials = {
    authEmail: process.env.COMPLIANCE_EMAIL,
    authPassword: process.env.COMPLIANCE_PASSWORD,
};

const validateDocument = async (req, res, next) => {
    const authCodeUrl = `${process.env.COMPLIANCE_API}/auth/code`;
    const authTokenUrl = `${process.env.COMPLIANCE_API}/auth/token`;
    const { name, document, password } = req.body;

    if (!(name && document && password)) {
        throw new BadRequestError('All input is required');
    }

    const authReqBody = {
        email: credentials.authEmail,
        password: credentials.authPassword,
    };

    const authCode = await axios
        .post(authCodeUrl, authReqBody)
        .then((response) => response.data.data.authCode)
        .catch((error) => error.response);

    if (authCode.status == 503) {
        throw new UnauthorizeError('Invalid Compliance Credentials');
    }

    const accessToken = await axios
        .post(authTokenUrl, { authCode })
        .then((response) => response.data.data.accessToken)
        .catch((error) => error.response);

    const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
    };

    const documentType = _checkDocumentType(onlyNumbers(document));
    let documentUrl = '';

    if (documentType.includes('cnpj')) {
        documentUrl = `${process.env.COMPLIANCE_API}/cnpj/validate`;
    } else {
        documentUrl = `${process.env.COMPLIANCE_API}/cpf/validate`;
    }

    const data = {
        document: onlyNumbers(document),
    };

    const response = await axios
        .post(documentUrl, data, config)
        .then((response) => response.data)
        .catch((error) => error.response);

    const { error } = response.data;

    if (error) {
        const statusCode = response.status;

        if (statusCode == 503) {
            throw new UnavailableServiceError(
                'Compliance API Internal Server Error.'
            );
        } else if (statusCode == 502) {
            throw new BadGatewayError('Compliance API is unavailable.');
        }
    }

    const document_status = response.data.status;

    if (document_status !== 1) {
        throw new UnauthorizeError(`Ivalid document: ${document}`);
    }

    res.body = req.body;

    next();
};

module.exports = validateDocument;
