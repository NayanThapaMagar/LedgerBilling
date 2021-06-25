module.exports = (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.clearCookie("contact", { path: "/" });
    return res.json({ success: true });
};