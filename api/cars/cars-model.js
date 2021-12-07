const db = require("../../data/db-config");

const getAll = async () => {
  return await db("cars").select(
    "car_id as id",
    "vin",
    "make",
    "model",
    "mileage",
    "title",
    "transmission"
  );
};

const getById = async (id) => {
  const car = await db("cars")
    .select(
      "car_id as id",
      "vin",
      "make",
      "model",
      "mileage",
      "title",
      "transmission"
    )
    .where("car_id", id)
    .first();
  return car;
};

const create = async (newCar) => {
  const [newCarId] = await db("cars").insert(newCar);

  const car = await getById(newCarId);

  return car;
};

module.exports = { getAll, getById, create };
