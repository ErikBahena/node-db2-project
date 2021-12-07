const { getById, getAll } = require("./cars-model");

const checkCarId = async (req, res, next) => {
  const car = await getById(req.params.id);

  if (car) next();

  if (!car)
    res
      .status(404)
      .json({ message: `car with id ${req.params.id} is not found` });
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
