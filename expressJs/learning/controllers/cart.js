const cart = (req, res) => {
  res.json("this is user Route");
};

const addToCart = (req, res) => {
  res.json("Added Successfully");
};

const removeFromCart = (req, res) => {
  res.json({status: "removed Successfully"});
};

const orderCart = (req, res) => {
  res.json({status: "ordered Successfully"});
};

module.exports = {
  cart,
  addToCart,
  removeFromCart,
  orderCart,
};
