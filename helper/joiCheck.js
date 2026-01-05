module.exports = {
    forReqBody: function(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
            }

            next();
        }
    },
    forReqParams: function(schema) {
        return (req, res, next) => {
            const { error } = schema.validate(req.params);
            if (error) {
                res.status(400).json({ status: false, message: error.details[0].message });
            }

            next();
        }
    }
}