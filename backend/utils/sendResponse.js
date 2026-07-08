const sendResponse = (res, statusCode, key, data) => {
    res.status(statusCode).json({
        success: true,
        [key]: data
    });
};

export default sendResponse;