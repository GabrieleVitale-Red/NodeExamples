const express = require('express');
const router = express.Router();
const catalog = require('../catalog/MongoCRUDCatalog');
const allEndpoints = require('../catalog/AllEndpointsCatalog');

router.get('/getDescription/:nomeChiamata', (req, res, next) => {
    const voce = catalog.getDescription(req.params.nomeChiamata);
    if (!voce) {
        return res.status(404).json({
            message: `Nessuna chiamata trovata con il nome "${req.params.nomeChiamata}"`,
            chiamateDisponibili: catalog.getAllKeys()
        });
    }
    res.status(200).json(voce);
});

router.get('/getAllDescriptions', (req, res, next) => {
    res.status(200).json(catalog.catalog);
});

router.get('/getAllEndpoints', (req, res, next) => {
    res.status(200).json(allEndpoints.getAll());
});

module.exports = router;
