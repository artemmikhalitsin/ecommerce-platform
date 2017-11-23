const rootPath = require('app-root-dir')
// Repositories
const ProductDescriptionRepository = require(rootPath +
  '/DataSource/Repository/ProductDescriptionRepository.js');
const InventoryItemRepository = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');
const PurchaseCollectionRepository = require(rootPath +
  '/DataSource/Repository/PurchaseCollectionRepository.js');
const TransactionLogRepository = require(rootPath +
  '/DataSource/Repository/TransactionLogRepository.js');
const UserRepository = require(rootPath +
  '/DataSource/Repository/UserRepository.js');

// Model types
const Tablet = require(rootPath + '/models/Tablet.js');
const Desktop = require(rootPath + '/models/Desktop.js');
const Laptop = require(rootPath + '/models/Laptop.js');
const Monitor = require(rootPath + '/models/Monitor.js');
const InventoryItem = (rootPath + '/models/InventoryItem.js');
const User = require(rootPath + '/models/User.js');

/**
 * Keeps track of all repositories
 */
class RepositoryRegistry {
  static getRepo(obj) {
    if (obj instanceof Tablet || obj instanceof Desktop ||
    obj instanceof Laptop || obj instanceof Monitor) {
      return ProductDescriptionRepository.instance();
    }
    if (obj instanceof InventoryItem) {
      return InventoryItemRepository.instance();
    }
    if (obj instanceof User) {
      return UserRepository.instance();
    }
    // TODO: Define mapping for PurchaseCollection and TransactionLog objects
  }
}

module.exports = RepositoryRegistry;
