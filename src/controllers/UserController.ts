import { open } from 'inspector';
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

    public static show = ({ user }, res) => {
        res.send(user);
    };

    public static update = async ({ user, body: data }, res) => {
        user.firstName =
            data.firstName === undefined ? user.firstName : data.firstName;

        user.lastName =
            data.lastName === undefined ? user.lastName : data.lastName;

        user.password = data.password;

        user.dni = data.dni === undefined ? user.dni : data.dni;

        // We remove undefined properties
        // So they don't trigger the validator
        Object.keys(user).forEach((key) => {
            return user[key] === undefined ? delete user[key] : {};
        });

        const validator = new Validator(user);

        const errors = await validator.check(true);

        if (Object.keys(errors).length > 0) {
            return res.status(422).send(errors);
        }

        try {
            await user.save();

            delete user.password;
        } catch (error) {
            return res.status(500).send({ error: 'Something went wrong.' });
        }

        res.send(user);
    };

    public static delete = async ({ user }, res) => {
        await User.remove(user);

        res.send(user);
    };
}
