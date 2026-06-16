class AllEndpointsCatalog {
    constructor() {
        this.endpoints = [
            {
                gruppo: 'serverTestRoutes',
                metodo: 'GET',
                endpoint: '/serverTestRoutes/',
                parametriPath: [],
                parametriBody: [],
                descrizione: 'Verifica che il server Express sia in esecuzione. Restituisce un messaggio di conferma se il server risponde correttamente.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/mongoConnetionTest',
                parametriPath: [],
                parametriBody: [],
                descrizione: 'Verifica lo stato della connessione a MongoDB. Restituisce un messaggio che indica se la connessione è attiva o fallita, controllando il valore di readyState del driver Mongoose.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'POST',
                endpoint: '/mongoCRUDRoutes/insertElement',
                parametriPath: [],
                parametriBody: ['testName', 'testValue'],
                descrizione: 'Inserisce un nuovo documento nella collezione MongoDB. Richiede nel body i campi testName (stringa) e testValue (numero). In caso di successo restituisce il documento appena creato con il suo _id.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/getElementByID/:idElem',
                parametriPath: ['idElem'],
                parametriBody: [],
                descrizione: 'Recupera un singolo documento dalla collezione MongoDB tramite il suo identificativo univoco (_id). Se il documento non viene trovato restituisce 404, se si verifica un errore sul database restituisce 500.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/findAllElements',
                parametriPath: [],
                parametriBody: [],
                descrizione: 'Recupera tutti i documenti presenti nella collezione MongoDB. Restituisce un array con tutti i documenti trovati e il numero totale degli elementi.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'DELETE',
                endpoint: '/mongoCRUDRoutes/deleteElementByID/:idElem',
                parametriPath: ['idElem'],
                parametriBody: [],
                descrizione: 'Elimina un documento dalla collezione MongoDB tramite il suo identificativo univoco (_id). In caso di successo conferma l\'avvenuta cancellazione.'
            },
            {
                gruppo: 'mongoCRUDRoutes',
                metodo: 'PUT',
                endpoint: '/mongoCRUDRoutes/updateElementByID/:idElem',
                parametriPath: ['idElem'],
                parametriBody: ['testName', 'testValue'],
                descrizione: 'Aggiorna i campi testName e testValue di un documento esistente nella collezione MongoDB, identificato tramite il suo _id passato come parametro nel path. Utilizza l\'operatore $set di MongoDB per aggiornare solo i campi specificati.'
            },
            {
                gruppo: 'catalogRoutes',
                metodo: 'GET',
                endpoint: '/catalogRoutes/getAllDescriptions',
                parametriPath: [],
                parametriBody: [],
                descrizione: 'Restituisce il catalogo completo delle chiamate MongoDB CRUD con metodo, endpoint, parametri e descrizione in italiano per ognuna.'
            },
            {
                gruppo: 'catalogRoutes',
                metodo: 'GET',
                endpoint: '/catalogRoutes/getDescription/:nomeChiamata',
                parametriPath: ['nomeChiamata'],
                parametriBody: [],
                descrizione: 'Restituisce la descrizione dettagliata di una singola chiamata MongoDB CRUD identificata per nome (es. findAllElements, insertElement). Se il nome non esiste, restituisce 404 con la lista dei nomi disponibili.'
            }
        ];
    }

    getAll() {
        return this.endpoints;
    }

    getByGruppo(gruppo) {
        return this.endpoints.filter(e => e.gruppo === gruppo);
    }

    getGruppi() {
        return [...new Set(this.endpoints.map(e => e.gruppo))];
    }
}

module.exports = new AllEndpointsCatalog();
