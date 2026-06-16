const catalog = require('../../api/catalog/AllEndpointsCatalog');

const GRUPPI_ATTESI = ['serverTestRoutes', 'mongoCRUDRoutes', 'catalogRoutes'];
const CAMPI_OBBLIGATORI = ['gruppo', 'metodo', 'endpoint', 'parametriPath', 'parametriBody', 'descrizione'];
const METODI_VALIDI = ['GET', 'POST', 'PUT', 'DELETE'];

describe('AllEndpointsCatalog - getAll', () => {
    test('deve restituire un array', () => {
        expect(Array.isArray(catalog.getAll())).toBe(true);
    });

    test('deve restituire esattamente 9 endpoint', () => {
        expect(catalog.getAll()).toHaveLength(9);
    });

    test('ogni endpoint deve avere tutti i campi obbligatori', () => {
        catalog.getAll().forEach(ep => {
            CAMPI_OBBLIGATORI.forEach(campo => {
                expect(ep).toHaveProperty(campo);
            });
        });
    });

    test('il metodo HTTP di ogni endpoint deve essere valido', () => {
        catalog.getAll().forEach(ep => {
            expect(METODI_VALIDI).toContain(ep.metodo);
        });
    });

    test('parametriPath e parametriBody devono essere array', () => {
        catalog.getAll().forEach(ep => {
            expect(Array.isArray(ep.parametriPath)).toBe(true);
            expect(Array.isArray(ep.parametriBody)).toBe(true);
        });
    });

    test('la descrizione di ogni endpoint deve essere una stringa non vuota', () => {
        catalog.getAll().forEach(ep => {
            expect(typeof ep.descrizione).toBe('string');
            expect(ep.descrizione.length).toBeGreaterThan(0);
        });
    });
});

describe('AllEndpointsCatalog - getGruppi', () => {
    test('deve restituire i 3 gruppi attesi', () => {
        const gruppi = catalog.getGruppi();
        expect(gruppi).toHaveLength(3);
        GRUPPI_ATTESI.forEach(g => {
            expect(gruppi).toContain(g);
        });
    });
});

describe('AllEndpointsCatalog - getByGruppo', () => {
    test('serverTestRoutes deve avere 1 endpoint', () => {
        expect(catalog.getByGruppo('serverTestRoutes')).toHaveLength(1);
    });

    test('mongoCRUDRoutes deve avere 6 endpoint', () => {
        expect(catalog.getByGruppo('mongoCRUDRoutes')).toHaveLength(6);
    });

    test('catalogRoutes deve avere 2 endpoint', () => {
        expect(catalog.getByGruppo('catalogRoutes')).toHaveLength(2);
    });

    test('un gruppo inesistente deve restituire array vuoto', () => {
        expect(catalog.getByGruppo('gruppoInesistente')).toHaveLength(0);
    });
});

describe('AllEndpointsCatalog - endpoint specifici', () => {
    test('insertElement deve richiedere testName e testValue nel body', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('insertElement'));
        expect(ep).toBeDefined();
        expect(ep.metodo).toBe('POST');
        expect(ep.parametriBody).toContain('testName');
        expect(ep.parametriBody).toContain('testValue');
        expect(ep.parametriPath).toHaveLength(0);
    });

    test('getElementByID deve richiedere idElem come path param', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('getElementByID'));
        expect(ep).toBeDefined();
        expect(ep.metodo).toBe('GET');
        expect(ep.parametriPath).toContain('idElem');
        expect(ep.parametriBody).toHaveLength(0);
    });

    test('deleteElementByID deve essere DELETE con idElem nel path', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('deleteElementByID'));
        expect(ep).toBeDefined();
        expect(ep.metodo).toBe('DELETE');
        expect(ep.parametriPath).toContain('idElem');
    });

    test('updateElementByID deve essere PUT con idElem nel path e body params', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('updateElementByID'));
        expect(ep).toBeDefined();
        expect(ep.metodo).toBe('PUT');
        expect(ep.parametriPath).toContain('idElem');
        expect(ep.parametriBody).toContain('testName');
        expect(ep.parametriBody).toContain('testValue');
    });

    test('findAllElements non deve avere parametri', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('findAllElements'));
        expect(ep).toBeDefined();
        expect(ep.parametriPath).toHaveLength(0);
        expect(ep.parametriBody).toHaveLength(0);
    });

    test('getDescription deve avere nomeChiamata come path param', () => {
        const ep = catalog.getAll().find(e => e.endpoint.includes('getDescription'));
        expect(ep).toBeDefined();
        expect(ep.metodo).toBe('GET');
        expect(ep.parametriPath).toContain('nomeChiamata');
    });
});
