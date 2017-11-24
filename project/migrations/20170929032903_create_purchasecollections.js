/**
  @author Michael Li
  Creates the PurchaseCollection Table in the 343DB Database.
*/
const tablename='PurchaseCollection';

exports.up = function(knex, Promise) {
  return knex.schema.createTable(tablename, (table) => {
    if (!table) {
      throw new Error('Error creating table ' + tablename);
    } else {
      table.string('purchaseId').notNullable().primary().unique();
      table.string('userID').notNullable();
      table.foreign('userID').references('User.email');
      table.string('serialNumber').notNullable().unique();
      table.string('modelNumber').notNullable();
      table.foreign('modelNumber').references('ProductDescription.modelNumber');
    }
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists(tablename);
};
