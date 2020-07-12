/**
 * @class QueryHelper
 */
export class QueryHelper {
  /**
   *
   * @param {Modal} model
   */
  constructor(model) {
    this.model = model;
  }
  /**
   *
   * @param {object} whereCondition
   * @param {array} include
   * @param {array} attributes
   */
  async findOne(whereCondition = {}, include = null, attributes) {
    return this.model.findOne({
      where: whereCondition,
      logging: false,
      include,
      attributes,
    });
  }
  /**
   *
   * @param {object} whereCondition
   * @param {array} include
   * @param {array} attributes
   * @param {number} offset
   * @param {number} limit
   * @param {array} orderBy
   */
  async findAll(
    whereCondition,
    include = null,
    attributes,
    offset = 0,
    limit = 20,
    orderBy = ['createdAt', 'ASC']
  ) {
    return this.model.findAll({
      order: [orderBy],
      offset,
      limit,
      where: whereCondition,
      attributes,
      logging: false,
      include,
    });
  }
  async create(data) {
    return this.model.create(data, { logging: false });
  }
  async bulkCreate(data) {
    return this.model.bulkCreate(data, { logging: false });
  }
  async update(data, whereCondition = {}) {
    return this.model.update(data, { where: whereCondition, logging: false });
  }
  async delete(whereCondition) {
    return this.model.destroy({
      where: whereCondition,
      logging: false,
    });
  }
  async findOrCreate(whereCondition, defaults) {
    return this.model.findOrCreate({ where: whereCondition, defaults });
  }
  async count(whereCondition = {}) {
    return this.model.count({ where: whereCondition });
  }
}
