const db = require("../../data/db-config");

const getAll = async () => {
  return await db("cars");
};

const getById = async (id) => {
  const car = await db("cars").where("car_id", id).first();
  return car;
};

const create = async (newCar) => {
  const [newCarId] = await db("cars").insert(newCar);

  return await getById(newCarId);
};

module.exports = { getAll, getById, create };
