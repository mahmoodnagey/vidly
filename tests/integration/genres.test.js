const request = require('supertest');
const {Genre} = require('../../models/genre');
const {User} = require('../../models/user');

describe('/api/genres', () => {
    let server;
    
    beforeEach(() => {server = require('../../index');});
    afterEach(async () => { 
        
        //Close the server to prevent errors as we will run server again each test on the same port
        await server.close();
        
        //Each test should remove the objects we have inserted
        await Genre.deleteMany();   
    });
    
    describe('GET /', () => {
       it('Should return all genres', async () => {
        
        await Genre.collection.insertMany([
            {name: 'genre1'},
            {name: 'genre2'}
        ]);
        
        const res = await request(server).get('/api/genres');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
        expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
        expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
       });
    });
    
    describe('/GET /:id', () => {
        it('should return a genre if valid id is passed', async () => {
            const genre = new Genre ({name: 'genre1'});
            await genre.save();
            
            const res = await request(server).get('/api/genres/' + genre._id);
            
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
        
        it('should return 404 if invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            
            expect(res.status).toBe(404);
        });
    });
    
    describe('POST /', () => {
        
        // Writing clean Test
        // Define the happy path, and then in each test we change one parameter
        // that clearly aligns with the name of the test
        let token;
        let name;
        
        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
        }
        
        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'genre1';
        });
        
        it('Should return 401 if client is not logged in', async () => {
            token = '';
            
            const res = await exec();
            
            expect(res.status).toBe(401);
        });
        
        it('Should return 400 if genre is less than 5 characters', async () => {
            name = '1234';
            
            const res = await exec();
            
            expect(res.status).toBe(400);
        });
        
        it('Should return 400 if genre is more than 50 characters', async () => {        
                
            //Genrate an array of 51 'a' characters
            name = new Array(52).join('a');
            
            const res = await exec();
            
            expect(res.status).toBe(400);
        });
        
        it('Should save the genre if it is valid', async () => {
            
            await exec();
                
            const genre = await Genre.find({name: 'genre1'});
            
            expect(genre).not.toBeNull();
        });
        
        it('Should return the genre if it is valid', async () => {

            const res = await exec();
                            
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
            
        });
    });
});
