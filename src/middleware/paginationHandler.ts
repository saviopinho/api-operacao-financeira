exports.paginatedResult = async (req, res, next) => {
    const { list, title } = res;
    const currentPage = req.query.currentPage || 1;
    const itemsPerPage = req.query.itemsPerPage || 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    return res.status(200).send({
        [title]: list.slice(startIndex, endIndex),
        pagination: { itemsPerPage, currentPage },
    });
};
