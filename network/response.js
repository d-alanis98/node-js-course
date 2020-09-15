exports.success = (req, res, statusCode, body) => {
    sendResponse(
        res, 
        statusCode || 200,
        body
    );
}

exports.error = (req, res, statusCode, message) => {
    console.error(message)
    sendResponse(
        res, 
        statusCode || 500,
        message
    );
}

const sendResponse = (res, statusCode, body) => res.status(statusCode).send(body);