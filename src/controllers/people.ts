const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const { people } = require('../../models');
const { onlyNumbers } = require('../helper/Utils');
const { ConflictError } = require('../helper/ApiError');

exports.createOne = async (req, res, next) => {
    const { name, document, password } = res.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const formated_document = onlyNumbers(document);

    const people_data = {
        id: v4(),
        name,
        document: formated_document,
        password: encryptedPassword,
    };

    const found = await people.findOne({
        where: { document: formated_document },
    });

    if (found) {
        throw new ConflictError('User already created');
    }

    const _people = await people.create(people_data);

    return res.status(201).json({
        id: _people.id,
        name: _people.name,
        document: _people.document,
        createdAt: _people.createdAt,
        updatedAt: _people.updatedAt,
    });
};
