import environment from '../config/environment';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../entity/User';
import Validator from '../utils/Validator';

export default class AuthController {
    public static login = async ({ body: data }, res) => {
        let user: User;
        const credentials = new User();
        const validator = new Validator(credentials);

        credentials.email = data.email;
        credentials.password = data.password;

        const errors = await validator.check(true);

        // Request validation
        if (Object.keys(errors).length > 0) {
            return res.status(422).send(errors);
        }

        try {
            user = await User.findOneOrFail({ email: credentials.email });

            // Password validation
            const arePasswordsEqual = await bcrypt.compare(
                credentials.password,
                user.password
            );

            if (!arePasswordsEqual) {
                throw new Error();
            }
        } catch (error) {
            return res.status(404).send({
                message:
                    "The given credentials don't match any of our records.",
            });
        }

        delete user.password;

        const tokenExpiresIn = '1h';
        const token = jwt.sign({ user_id: user.id }, environment.jwt_secret, {
            expiresIn: tokenExpiresIn,
        });

        return res.send({
            ...user,
            token: { bearer: token, expires_in: tokenExpiresIn },
        });
    };
}
