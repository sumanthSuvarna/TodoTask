const request = require('supertest')
const app = require('../app');

describe('Login',()=>{
    it('POST /api/login ----> valid login',()=>{
        return request(app)
            .post('/api/login')
            .send({"email":"sumanth@voltest.com", "password":"suvarna"})
            .expect(200)
            .then((response)=>{                
                expect(response.body).toEqual(
                    expect.objectContaining({
                        accessToken:expect.any(String)
                    }),
                )
            })
            
    })

    it('POST /api/login ----> invalid login',()=>{
        return request(app)
            .post('/api/login')
            .send({"email":"sumanth@voltest.com", "password":"pppppp"})
            .expect(401)
    })

    it('POST /api/login ----> Empty body',()=>{
        return request(app)
            .post('/api/login')
            .send()
            .expect(401)
    })
})