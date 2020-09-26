import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const environment = {
    jwt_secret: process.env.JWT_SECRET,
};

export default environment;
