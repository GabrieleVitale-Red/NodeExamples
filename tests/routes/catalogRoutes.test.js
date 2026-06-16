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
