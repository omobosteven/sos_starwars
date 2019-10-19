class ServerError extends Error {
    constructor() {
        super();
        this.message = 'Internal Server error';
        this.name = 'ServerError';
        this.status = 500;
    }
}

export default ServerError;
