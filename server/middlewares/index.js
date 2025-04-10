const authMiddlewares = require('./auth');
const multerMiddlewares = require('./multer');

module.exports = {
    authMiddlewares: authMiddlewares,
    multerMiddlewares : multerMiddlewares,
}