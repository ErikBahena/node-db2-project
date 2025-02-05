// DO YOUR MAGIC
const express = require("express");
const router = express.Router();

// database access functions
const CarsModel = require("./cars-model");

// middleware
const {
  checkCarId,
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarPayload,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  CarsModel.getAll()
    .then((cars) => res.status(200).json(cars))
    .catch((err) => next(err));
});

router.get("/:id", checkCarId, (req, res, next) => {
  CarsModel.getById(req.params.id)
    .then((car) => res.status(200).json(car))
    .catch((err) => next(err));
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    CarsModel.create(req.body)
      .then((newCar) => res.status(201).json(newCar))
      .catch((err) => next(err));
  }
);

router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, stack: err.stack });
});

module.exports = router;
