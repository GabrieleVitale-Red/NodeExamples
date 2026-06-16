class MongoCRUDCatalog {
    constructor() {
        this.catalog = {
            mongoConnetionTest: {
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/mongoConnetionTest',
                parametri: [],
                descrizione: 'Verifica lo stato della connessione a MongoDB. Restituisce un messaggio che indica se la connessione è attiva o fallita, controllando il valore di readyState del driver Mongoose.'
            },
            insertElement: {
                metodo: 'POST',
                endpoint: '/mongoCRUDRoutes/insertElement',
                parametri: ['testName (body)', 'testValue (body)'],
                descrizione: 'Inserisce un nuovo documento nella collezione MongoDB. Richiede nel body della richiesta i campi testName (stringa) e testValue (numero). In caso di successo restituisce il documento appena creato.'
            },
            getElementByID: {
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/getElementByID/:idElem',
                parametri: ['idElem (path param)'],
                descrizione: 'Recupera un singolo documento dalla collezione MongoDB tramite il suo identificativo univoco (_id). Se il documento non viene trovato restituisce un errore 404, se si verifica un problema sul database restituisce un errore 500.'
            },
            findAllElements: {
                metodo: 'GET',
                endpoint: '/mongoCRUDRoutes/findAllElements',
                parametri: [],
                descrizione: 'Recupera tutti i documenti presenti nella collezione MongoDB. Restituisce un array con tutti i documenti trovati e il numero totale degli elementi. Se non esiste nessun documento restituisce un errore 404.'
            },
            deleteElementByID: {
                metodo: 'DELETE',
                endpoint: '/mongoCRUDRoutes/deleteElementByID/:idElem',
                parametri: ['idElem (path param)'],
                descrizione: 'Elimina un documento dalla collezione MongoDB tramite il suo identificativo univoco (_id). In caso di successo conferma l\'avvenuta cancellazione. Se si verifica un problema restituisce un errore 500.'
            },
            updateElementByID: {
                metodo: 'PUT',
                endpoint: '/mongoCRUDRoutes/updateElementByID/:idElem',
                parametri: ['idElem (path param)', 'testName (body)', 'testValue (body)'],
                descrizione: 'Aggiorna i campi testName e testValue di un documento esistente nella collezione MongoDB, identificato tramite il suo _id passato come parametro nel path. Utilizza l\'operatore $set di MongoDB per aggiornare solo i campi specificati.'
            }
        };
    }

    getDescription(nomeChiamata) {
        const voce = this.catalog[nomeChiamata];
        if (!voce) {
            return null;
        }
        return voce;
    }

    getAllKeys() {
        return Object.keys(this.catalog);
    }
}

module.exports = new MongoCRUDCatalog();
