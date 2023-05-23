const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

describe('auth middleware', () => {
    let server;
    beforeEach(() => {server = require('../../index');});
    afterEach( async () => { 
        //Each test should remove the collection we have inserted
        await Genre.deleteMany();
        
        //Close the server to prevent errors as we will run server again each test on the same port
        await server.close();
    });
    
    let token;
    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({name: 'genre1'});
    }
    
    beforeEach(() => {
        token = new User().generateAuthToken();
    });
    
    it('should return 401 if no token is provided', async () => {
        token = '';
        
        const res = await exec();
        
        expect(res.status).toBe(401);
    });
    
    it('should return 400 if token is invalid', async () => {
        token = 'a';
        
        const res = await exec();
        
        expect(res.status).toBe(400);
    });
    
    it('should return 200 if token is valid', async () => {

        const res = await exec();
        
        expect(res.status).toBe(200);
    });

});