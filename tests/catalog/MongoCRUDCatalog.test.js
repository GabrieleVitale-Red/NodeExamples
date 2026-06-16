const catalog = require('../../api/catalog/MongoCRUDCatalog');

const CHIAMATE_ATTESE = [
    'mongoConnetionTest',
    'insertElement',
    'getElementByID',
    'findAllElements',
    'deleteElementByID',
    'updateElementByID'
];

describe('MongoCRUDCatalog - getAllKeys', () => {
    test('deve restituire tutte le 6 chiavi del catalogo', () => {
        const keys = catalog.getAllKeys();
        expect(keys).toHaveLength(6);
    });

    test('deve contenere tutte le chiamate attese', () => {
        const keys = catalog.getAllKeys();
        CHIAMATE_ATTESE.forEach(nome => {
            expect(keys).toContain(nome);
        });
    });
});

describe('MongoCRUDCatalog - getDescription', () => {
    test('deve restituire null per un nome non esistente', () => {
        expect(catalog.getDescription('chiamataInesistente')).toBeNull();
    });

    test('ogni voce deve avere i campi obbligatori: metodo, endpoint, parametri, descrizione', () => {
        CHIAMATE_ATTESE.forEach(nome => {
            const voce = catalog.getDescription(nome);
            expect(voce).not.toBeNull();
            expect(voce).toHaveProperty('metodo');
            expect(voce).toHaveProperty('endpoint');
            expect(voce).toHaveProperty('parametri');
            expect(voce).toHaveProperty('descrizione');
        });
    });

    test('mongoConnetionTest - metodo deve essere GET', () => {
        const voce = catalog.getDescription('mongoConnetionTest');
        expect(voce.metodo).toBe('GET');
    });

    test('mongoConnetionTest - non deve richiedere parametri', () => {
        const voce = catalog.getDescription('mongoConnetionTest');
        expect(voce.parametri).toHaveLength(0);
    });

    test('insertElement - metodo deve essere POST', () => {
        const voce = catalog.getDescription('insertElement');
        expect(voce.metodo).toBe('POST');
    });

    test('insertElement - deve richiedere testName e testValue nel body', () => {
        const voce = catalog.getDescription('insertElement');
        expect(voce.parametri).toContain('testName (body)');
        expect(voce.parametri).toContain('testValue (body)');
    });

    test('getElementByID - metodo deve essere GET', () => {
        const voce = catalog.getDescription('getElementByID');
        expect(voce.metodo).toBe('GET');
    });

    test('getElementByID - deve richiedere il parametro idElem nel path', () => {
        const voce = catalog.getDescription('getElementByID');
        expect(voce.parametri).toContain('idElem (path param)');
    });

    test('findAllElements - metodo deve essere GET', () => {
        const voce = catalog.getDescription('findAllElements');
        expect(voce.metodo).toBe('GET');
    });

    test('findAllElements - non deve richiedere parametri', () => {
        const voce = catalog.getDescription('findAllElements');
        expect(voce.parametri).toHaveLength(0);
    });

    test('deleteElementByID - metodo deve essere DELETE', () => {
        const voce = catalog.getDescription('deleteElementByID');
        expect(voce.metodo).toBe('DELETE');
    });

    test('deleteElementByID - deve richiedere il parametro idElem nel path', () => {
        const voce = catalog.getDescription('deleteElementByID');
        expect(voce.parametri).toContain('idElem (path param)');
    });

    test('updateElementByID - metodo deve essere PUT', () => {
        const voce = catalog.getDescription('updateElementByID');
        expect(voce.metodo).toBe('PUT');
    });

    test('updateElementByID - deve richiedere idElem, testName e testValue', () => {
        const voce = catalog.getDescription('updateElementByID');
        expect(voce.parametri).toContain('idElem (path param)');
        expect(voce.parametri).toContain('testName (body)');
        expect(voce.parametri).toContain('testValue (body)');
    });

    test('la descrizione di ogni voce deve essere una stringa non vuota', () => {
        CHIAMATE_ATTESE.forEach(nome => {
            const voce = catalog.getDescription(nome);
            expect(typeof voce.descrizione).toBe('string');
            expect(voce.descrizione.length).toBeGreaterThan(0);
        });
    });
});
