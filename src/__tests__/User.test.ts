import { response } from "express";
import request from "supertest"
import { getConnection } from "typeorm";
import { app } from "../app"

import createConnection from "../database"

describe("Users", () => {
    beforeAll( async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    });

    afterAll( async () => {
        const connection = await getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

   it ("showt be able to create a new user", async () => {
    const response = await request(app).post('/users').send ({
        name: "negodi",
        email: "negodi@gmail.com"
    });
   
    expect(response.status).toBe(201)
    });

    it ("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post('/users').send ({
            name: "negodi",
            email: "negodi@gmail.com"
        });
       
        expect(response.status).toBe(400)
    })

});