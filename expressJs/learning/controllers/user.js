const user = (req, res) => {
  const user = {
    id: 1,
    name: "anand",
    address: "21/9, abc",
  };
  res.json(user); // it will send json data
};

const userId = (req, res) => {
  console.log(req.params);
  const dynamicUserId = {
    userId: req.params.userId,
  };
  // res.json(dynamicUserId);
  res.status(201).json(dynamicUserId);
};
const createUser = (req, res) => {
  const responseJson = {
    success: true,
    message: "User Created successfully",
  };
  res.json(responseJson);
};

const updateUser = (req, res) => {
  const putResponse = {
    success: true,
    message: "User replaced successfully",
  };
  res.json(putResponse);
};
const removeUser = (req, res) => {
  const deleteResponse = {
    success: true,
    message: "User deleted successfully",
  };
  res.json(deleteResponse);
};

module.exports = {
  user,
  userId,
  createUser,
  updateUser,
  removeUser,
};
