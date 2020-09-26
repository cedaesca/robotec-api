import User from '../entity/User';
import Validator from '../utils/Validator';

export default class UserController {
    public static store = async ({ body: data }, res) => {
        let user = new User();

        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.password = data.password;
        user.dni = data.dni;

        const validator = new Validator(user);

        const errors = await validator.check();

        if (Object.keys(errors).length > 0) {
            return res.status(422).send(errors);
        }

        try {
            user = await user.save();
        } catch (error) {
            // If all the validation pass
            // There's only one case where
            // this will fail and that's when
            // email is already in use.
            return res.status(422).send({ email: ['email is already in use'] });
        }

        // We don't want to expose the password
        // so we remove it from the object
        delete user.password;

        res.status(201).send(user);
    };

    public static show = async ({ user }, res) => {
        res.send(user);
    };

    public static update = async (req, res) => {
        res.send({ message: 'ok' });
    };

    public static delete = async (req, res) => {
        res.send({ message: 'ok' });
    };
}
