const bodyParserMiddleware = (error, req, res, next) => {
    if (error) {
        return res.status(error.status).send(error);
    }

    next();
};

export default bodyParserMiddleware;
