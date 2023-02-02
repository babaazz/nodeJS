const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const duplicatesExist = userDB.users.some((usr) => usr.username === user);
  if (duplicatesExist) return res.sendStatus(409);
  try {
    //encrypt password using bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ success: `New User ${user} has been created` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
