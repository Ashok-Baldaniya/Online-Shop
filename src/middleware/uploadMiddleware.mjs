import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export const uploadMiddleware = (req, res, next) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const files = req.files;
        const errors = [];

        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const maxSize = 20 * 1024 * 1024;

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });

        if (errors.length > 0) {
            files.forEach((file) => {
                fs.unlinkSync(file.path);
            });

            return res.status(400).json({ errors });
        }

        req.files = files;
        next();
    });
};
