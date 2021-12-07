const vinValidator = require("vin-validator");

const { getById, getAll } = require("./cars-model");

const checkCarId = async (req, res, next) => {
  const car = await getById(req.params.id);

  if (car) next();
  else
    res
      .status(404)
      .json({ message: `car with id ${req.params.id} is not found` });
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    res.status(400).json({ message: `vin is missing` });
    return;
  } else if (!req.body.make) {
    res.status(400).json({ message: `make is missing` });
    return;
  } else if (!req.body.model) {
    res.status(400).json({ message: `model is missing` });
    return;
  } else if (!req.body.mileage) {
    res.status(400).json({ message: `mileage is missing` });
    return;
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const valid = vinValidator.validate(req.body.vin);

  if (valid) next();
  else res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
};

const checkVinNumberUnique = async (req, res, next) => {
  const cars = await getAll();

  const foundRepeat = cars.find((car) => car.vin === req.body.vin);

  if (foundRepeat)
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  else next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
