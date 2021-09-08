const request = require('supertest')
const app = require('../app');


describe('User',()=>{
    let token = ""
    it('POST /api/login ----> valid login',()=>{
        return request(app)
            .post('/api/login')
            .send({"email":"sumanth@voltest.com", "password":"suvarna"})
            .expect(200)
            .then((response)=>{          
                token =response.body.accessToken
                expect(response.body).toEqual(
                    expect.objectContaining({
                        accessToken:expect.any(String)
                    }),
                )
            })
            
    })

    it('GET /API/USERS ---> get All Users', () =>{
        return request(app)
            .get('/api/users')
            //.expect('Content-Type',/json/)
            .set('Authorization',`Bearer ${token}`) // Works.
            .then((response) =>{
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id:expect.any(Number),
                            username:expect.any(String),
                            email: expect.any(String),
                            role:expect.any(String)
                        }),
                    ])
                )
            })
    });

    it('GET /API/USERS/:ID ---> get specific User', () =>{
        return request(app)
            .get('/api/users/38')
            //.expect('Content-Type',/json/)
            .set('Authorization',`Bearer ${token}`) // Works.
            .expect(200)            
            .then((response) =>{
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id:expect.any(Number),
                        username:expect.any(String),
                        email: expect.any(String),
                        role:expect.any(String)
                    }),                    
                )
            })
    })

    it('GET API/USERS/:ID ---> 403 if user not found',()=>{
        return request(app).get('/api/users/999999').expect(403);
    })

    it('POST /API/USERS ----> Add data to the database',() =>{
        return request(app).post('/api/users').send({    
             username:"aaaa",
             email:"aaa.aa@gmail.com",
             password:"aaaa",
             role:"user"})
             .set('Authorization',`Bearer ${token}`) // Works.
        //.expect('Content-type', /json/).expect(201)
        .then((response) =>{
            expect(response.body).toEqual(
                expect.objectContaining({
                    id:expect.any(Number)
                }),                    
            )
        })
    })
})
