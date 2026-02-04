const request = require('supertest');

const app = require('./index');
const mongoose = require('mongoose');


const student = {
    id: 516,
    name: "Durga",
    branch: "CSE",
    college: "ABC",
    marks: 90,
    grade: "A"
};


afterAll(async () => {
    await mongoose.connection.close();
});


describe('GET /', () => {

    it('should return 200 as a status and message object', async () => {

        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("welcome to cse");

    });

});



describe("POST /data", () => {

    it("should add student", async () => {

        const res = await request(app)
            .post("/data")
            .send(student);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Durga");

    });

});




describe("GET /data/:id", () => {

    it("should return student details", async () => {

        const res = await request(app).get("/data/516");

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("Durga");
        expect(res.body.grade).toBe("A");

    });

});




describe("PUT /data/:id", () => {

    it("should update marks", async () => {

        const res = await request(app)
            .put("/data/516")
            .send({ marks: 95 });

        expect(res.statusCode).toBe(200);
        expect(res.body.marks).toBe(95);

    });

});


describe("DELETE /data/:id", () => {

    it("should delete student", async () => {

        const res = await request(app).delete("/data/501");

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Deleted");

    });

});