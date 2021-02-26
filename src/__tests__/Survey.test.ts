import { response } from "express";
import request from "supertest"
import { app } from "../app"

import createConnection from "../database"

describe("Surveys", () => {
    beforeAll( async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    });

   it ("showt be able to create a new surbey", async () => {
    const response = await request(app).post('/surveys').send ({
        title: "Title Example",
        description: "Description Example"

    });
   
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id")
    });

    it ("Should be able to get all surveys", async () => {
         await request(app).post('/surveys').send ({
            title: "Title Example",
            description: "Description Example"
        });

        const response = await request(app).get('/surveys')
       
        expect(response.body.length).toBe(2)
        
    })

});