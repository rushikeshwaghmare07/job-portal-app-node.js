const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(item => item.message).join(", ");
    } else if (err.code === 11000) {
        statusCode = 400;
        message = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    res.status(statusCode).json({ message });
};

module.exports = errorMiddleware;
