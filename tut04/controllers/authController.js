const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const foundUser = userDB.users.find((usr) => usr.username === user);
  if (!foundUser) return res.status(401).json({ message: `${user} not found` });
  //Matching passwords
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.json({ success: `User ${user} logged in` });
  } else {
    res.status(401).json({ message: `wrong password` });
  }
};

module.exports = { handleLogin };
