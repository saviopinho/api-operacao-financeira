import { Request, Response } from 'express';

class PaginationHandler {
    async paginatedResult(req: Request, res: Response) {
        const { list, title } = req.body;
        const currentPage = req.query.currentPage || 1;
        const itemsPerPage = req.query.itemsPerPage || 10;
        const startIndex = (Number(currentPage) - 1) * Number(itemsPerPage);
        const endIndex = Number(currentPage) * Number(itemsPerPage);
        const sortedDesc = list.sort(
            (
                objA: { updatedAt: { getTime: () => number } },
                objB: { updatedAt: { getTime: () => number } }
            ) => objB.updatedAt.getTime() - objA.updatedAt.getTime()
        );

        return res.status(200).send({
            [title]: sortedDesc.slice(startIndex, endIndex),
            pagination: {
                itemsPerPage: parseInt(itemsPerPage.toString()),
                currentPage: parseInt(currentPage.toString()),
            },
        });
    }
}

export default new PaginationHandler();
