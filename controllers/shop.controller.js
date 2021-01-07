const shopService = require('../services/shop.service');

module.exports.getAll = async function (req, res, next) {
  try {
    const shops = await shopService.getAll();
    return res.status(200).json(shops);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'message': 'Something went wrong' });
  }
}

module.exports.getById = async function (req, res, next) {
  try {
    const shop = await shopService.getById(req.params.id);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'message': 'Something went wrong' });
  }
}

module.exports.create = async function (req, res, next) {
  try {
    const shop = await shopService.create(req.body);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'message': 'Something went wrong' });
  }
}

module.exports.updateById = async function (req, res, next) {
  try {
    const shop = await shopService.updateById(req.params.id, req.body);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'message': 'Something went wrong' });
  }
}

module.exports.deleteById = async function (req, res, next) {
  try {
    const shop = await shopService.deleteById(req.params.id);
    return res.status(200).json(shop);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ 'message': 'Something went wrong' });
  }
}