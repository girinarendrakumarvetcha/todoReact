const express = require('express');

const CatalogCtrl = require('../controllers/amount_catalog-ctrl');

const router = express.Router();

router.post('/amt_catalog_insert', CatalogCtrl.createAmtCatalogue);
router.put('/amt_catalog/update/:id', CatalogCtrl.updateAmtCatalogue);
router.delete('/amt_catalog/delete/:id', CatalogCtrl.deleteAmtCatalogue);
router.get('/amt_catalog/:id', CatalogCtrl.getAmtCatalogueById);
router.get('/amtcataloglist', CatalogCtrl.getAmtCatalogueList);
router.get('/amtcatalogdropdown', CatalogCtrl.getAmtCatalogueDrpdwn);
router.get('/amt_catalog/fetch/:id', CatalogCtrl.getAmtCatalogueById);

module.exports = router