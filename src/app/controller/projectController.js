exports.base = async (req, res) => {
    res.send({ok: true, user: req.userId});
};