import { Request, Response } from 'express';

class PaginationHandler {
    async paginatedResult(req: Request, res: Response) {
        const { list, title } = req.body;
        const currentPage = (req.query.currentPage || 1) as number;
        const itemsPerPage = (req.query.itemsPerPage || 10) as number;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = currentPage * itemsPerPage;

        return res.status(200).send({
            [title]: list.slice(startIndex, endIndex),
            pagination: { itemsPerPage, currentPage },
        });
    }
}

export default new PaginationHandler();
