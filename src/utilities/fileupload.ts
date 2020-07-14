import * as multer from 'multer';

/**
 * write file to disk
 */
const storage_local = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        console.log('asf')
        callback(null, '/' + file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

/**
 * write file to buffer
 */
const storage_memory = multer.memoryStorage();

export const upload = multer({ storage: storage_local });