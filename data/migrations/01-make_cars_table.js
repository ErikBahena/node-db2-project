exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments("car_id");

    table.string("vin", 20).notNullable().unique();
    table.string("make", 40).notNullable();
    table.string("model", 40).notNullable();
    table.integer("mileage").notNullable();
    table.string("title", 40);
    table.string("transmission", 40);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};
