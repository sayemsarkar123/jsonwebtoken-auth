const Shop = require('../models/Shop.model');

module.exports.getAll = () => Shop.find({});
module.exports.getById = id => Shop.findById(id);
module.exports.create = payload => Shop.create(payload);
module.exports.updateById = (id, data) => Shop.findByIdAndUpdate(id, data, { new: true });
module.exports.deleteById = id => Shop.findByIdAndDelete(id);