class QueryValidation {
    static validateQuery(req, res, next) {
        const { sort, filter } = req.query;

        const sortParams = ['name', 'name:desc', 'name:asc',
            'gender', 'gender:desc', 'gender:asc',
            'height', 'height:desc', 'height:asc'];

        const filterParams = ['male', 'gender:male', 'gender:female', 'female'];

        if (!(sort && sortParams.includes(sort.toLowerCase()))) {
            req.query.sort = null;
        }

        if (!(filter && filterParams.includes(filter.toLowerCase()))) {
            req.query.filter = null;
        }

        return next();
    }
}

export default QueryValidation;
