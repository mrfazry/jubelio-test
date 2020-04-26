"use strict";

module.exports = class {
  constructor(repository) {
    this.repository = repository;
  }

  persist(productEntity) {
    return this.repository.persist(productEntity);
  }

  merge(productId, productEntity) {
    return this.repository.merge(productId, productEntity);
  }

  remove(productId) {
    return this.repository.remove(productId);
  }

  find() {
    return this.repository.find();
  }
};
