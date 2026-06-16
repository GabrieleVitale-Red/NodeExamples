const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');
const catalogRoutes = require('../../api/routes/catalogRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/catalogRoutes', catalogRoutes);

describe('GET /catalogRoutes/getDescription/:nomeChiamata', () => {
    test('findAllElements - risponde 200 con i campi attesi', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/findAllElements');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('metodo', 'GET');
        expect(res.body).toHaveProperty('endpoint');
        expect(res.body).toHaveProperty('descrizione');
        expect(res.body).toHaveProperty('parametri');
    });

    test('insertElement - risponde 200 con metodo POST', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/insertElement');
        expect(res.statusCode).toBe(200);
        expect(res.body.metodo).toBe('POST');
    });

    test('deleteElementByID - risponde 200 con metodo DELETE', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/deleteElementByID');
        expect(res.statusCode).toBe(200);
        expect(res.body.metodo).toBe('DELETE');
    });

    test('updateElementByID - risponde 200 con metodo PUT', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/updateElementByID');
        expect(res.statusCode).toBe(200);
        expect(res.body.metodo).toBe('PUT');
    });

    test('mongoConnetionTest - risponde 200 con array parametri vuoto', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/mongoConnetionTest');
        expect(res.statusCode).toBe(200);
        expect(res.body.parametri).toHaveLength(0);
    });

    test('getElementByID - risponde 200 con idElem nei parametri', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/getElementByID');
        expect(res.statusCode).toBe(200);
        expect(res.body.parametri).toContain('idElem (path param)');
    });

    test('nome non esistente - risponde 404 con lista chiamateDisponibili', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/chiamataInesistente');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('chiamateDisponibili');
        expect(Array.isArray(res.body.chiamateDisponibili)).toBe(true);
        expect(res.body.chiamateDisponibili.length).toBeGreaterThan(0);
    });

    test('nome non esistente - il messaggio cita il nome passato', async () => {
        const res = await request(app).get('/catalogRoutes/getDescription/qualcosa');
        expect(res.body.message).toContain('qualcosa');
    });
});

describe('GET /catalogRoutes/getAllDescriptions', () => {
    test('risponde 200', async () => {
        const res = await request(app).get('/catalogRoutes/getAllDescriptions');
        expect(res.statusCode).toBe(200);
    });

    test('contiene tutte e 6 le chiamate', async () => {
        const res = await request(app).get('/catalogRoutes/getAllDescriptions');
        const chiavi = Object.keys(res.body);
        expect(chiavi).toHaveLength(6);
    });

    test('ogni voce ha metodo, endpoint, parametri e descrizione', async () => {
        const res = await request(app).get('/catalogRoutes/getAllDescriptions');
        Object.values(res.body).forEach(voce => {
            expect(voce).toHaveProperty('metodo');
            expect(voce).toHaveProperty('endpoint');
            expect(voce).toHaveProperty('parametri');
            expect(voce).toHaveProperty('descrizione');
        });
    });
});

describe('GET /catalogRoutes/getAllEndpoints', () => {
    test('risponde 200', async () => {
        const res = await request(app).get('/catalogRoutes/getAllEndpoints');
        expect(res.statusCode).toBe(200);
    });

    test('restituisce un array con 9 endpoint', async () => {
        const res = await request(app).get('/catalogRoutes/getAllEndpoints');
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toHaveLength(9);
    });

    test('ogni voce ha i campi obbligatori', async () => {
        const res = await request(app).get('/catalogRoutes/getAllEndpoints');
        res.body.forEach(ep => {
            expect(ep).toHaveProperty('gruppo');
            expect(ep).toHaveProperty('metodo');
            expect(ep).toHaveProperty('endpoint');
            expect(ep).toHaveProperty('parametriPath');
            expect(ep).toHaveProperty('parametriBody');
            expect(ep).toHaveProperty('descrizione');
        });
    });

    test('i 3 gruppi attesi sono presenti', async () => {
        const res = await request(app).get('/catalogRoutes/getAllEndpoints');
        const gruppi = [...new Set(res.body.map(ep => ep.gruppo))];
        expect(gruppi).toContain('serverTestRoutes');
        expect(gruppi).toContain('mongoCRUDRoutes');
        expect(gruppi).toContain('catalogRoutes');
    });

    test('parametriPath e parametriBody sono array', async () => {
        const res = await request(app).get('/catalogRoutes/getAllEndpoints');
        res.body.forEach(ep => {
            expect(Array.isArray(ep.parametriPath)).toBe(true);
            expect(Array.isArray(ep.parametriBody)).toBe(true);
        });
    });
});
