class QueryValidation {
    static validateQuery(req, res, next) {
        const { sort, order } = req.query;

        const sortParams = ['name', 'gender', 'height'];
        const orderParams = ['asc', 'desc'];


        if (!(order && orderParams.includes(order.toLowerCase()))) {
            req.query.order = 'asc';
        }

        if (!(sort && sortParams.includes(sort.toLowerCase()))) {
            req.query.sort = null;
            req.query.order = null;
        }

        return next();
    }
}

export default QueryValidation;
