import environment from '../config/environment';
import * as jwt from 'jsonwebtoken';
import User from '../entity/User';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, environment.jwt_secret);

        const user = await User.findOneOrFail({ id: decoded.user_id });

        delete user.password;

        req.user = user;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

export default auth;
