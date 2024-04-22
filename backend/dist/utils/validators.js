import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password should contain at least 6 characters"),
];
export const signupValidator = [
    body("firstname").notEmpty().withMessage("Fisrt name is required"),
    body("lastname").notEmpty().withMessage("Last name is required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("text").notEmpty().withMessage("Message  is required"),
];
//# sourceMappingURL=validators.js.map