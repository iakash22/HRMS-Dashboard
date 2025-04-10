const multer = require('multer');

exports.multerUpload = multer({
    limits: {
        fieldSize: 1024 * 1024 * 2,
    }
});

exports.singleFile = this.multerUpload.single('resume');
exports.attachmentsMulter = this.multerUpload.array("files", 5);