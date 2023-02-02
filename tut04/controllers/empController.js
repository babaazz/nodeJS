const data = {
  emps: require("../model/employees.json"),
  setEmps: function (data) {
    this.emps = data;
  },
};

const getAllEmps = (req, res) => {
  res.json(data.emps);
};

const createNewEmp = (req, res) => {
  const newEmp = {
    id: data.emps[data.emps.length - 1].id + 1 || 1,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    website: req.body.website,
    company: req.body.company,
  };
  if (!newEmp.name || !newEmp.username || !newEmp.email) {
    return res
      .status(400)
      .json({ message: "Name , username and email are required" });
  }
  data.setEmps([...data.emps, newEmp]);
  res.json(data.emps);
};

const updateEmp = (req, res) => {
  const emp = data.emps.find((e) => e.id === parseInt(req.body.id));
  if (!emp) {
    return res
      .status(400)
      .json({ message: `EMP ID: ${req.body.id} not found` });
  }
  const updatedEmp = { ...emp, ...req.body };
  const filteredEmp = data.emps.filter((e) => e.id !== parseInt(req.body.id));
  const unsortedEmp = [...filteredEmp, updatedEmp];
  const sortedEmp = unsortedEmp.sort((a, b) =>
    a.id > b.id ? 1 : a.id < b.id ? -1 : 0
  );
  data.setEmps(sortedEmp);
  res.json(data.emps);
};

const deleteEmp = (req, res) => {
  const empToDel = data.emps.find((e) => e.id === parseInt(req.body.id));
  if (!empToDel) {
    return res.json({
      message: `Employee with ID: ${req.body.id} doesn't exist`,
    });
  }
  data.setEmps(data.emps.filter((e) => e.id !== parseInt(req.body.id)));
  res.json(data.emps);
};

const getEmp = (req, res) => {
  const emp = data.emps.find((e) => e.id === parseInt(req.params.id));
  if (!emp) {
    return res.json({
      message: `Employee with ID: ${req.params.id} doesn't exist`,
    });
  }
  res.json(emp);
};

module.exports = {
  getAllEmps,
  createNewEmp,
  updateEmp,
  deleteEmp,
  getEmp,
};
