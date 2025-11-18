class Service {
  
  constructor(model) {
    this.model = model
  }

  /**
   * @description Create and Save a new Model
   * @param {*} data
   * 
  */
  async create(data) {
    const newDoc = await this.model.create(data);
    return newDoc;
  }
  /**
   * @description findAndCountAll
   * @param {*} query
  */
  async find(query) {
    const rta = await this.model.findAndCountAll({...query})
    return {
        ...rta,
        limit: query.limit,
        offset: query.offset,
    }
  }
  /**
   * @description Retrieve all the rows of the model
   * @param {*} query
  */
   async findAll(query) {
    const rta = await this.model.findAll({...query})
    return rta;
  }
  /**
   * @description Find a single row
   * @param {*} where
  */
  async findOne({ where, attributes, raw = false }) {
    const doc = await this.model.findOne({ attributes, where, raw });
    if (!doc) return null
    return doc;
  }
  /**
   * @description find or Create a new Model
   * @param {*} query
   * @param {*} obj
   * 
  */
  async findOrCreate(query, obj) {
    const rta = await this.model.findOrCreate({ where: query, defaults: obj });
    return rta;
  }
  /**
   * @description Find a single row by id
   * @param {*} id
  */
  async findOneById(id) {
    const doc = await this.model.findByPk(id);
    if (!doc) {
      throw new Error('doc not found');
    }
    return doc;
  }
  /**
   * @description Update a row by the id in the request
   * @param {*} id
   * @param {*} body
  */
  async update(id, body) {
    const rta = await this.model.update(body, { where: { id } });
    return rta;
  }
  /**
   * @description Delete a row with the specified id in the request
   * @param {*} id 
  */
  async delete(id) {
    const deleted = await this.model.destroy({ where: { id } });
    return deleted;
  }
}

module.exports = Service;