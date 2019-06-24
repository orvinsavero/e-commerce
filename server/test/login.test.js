const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteUser } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;

describe("User login", () => {
  after(() => {
    deleteUser();
  });
  describe("POST /register", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "orvin", email: "orvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("password");
          expect(res.body).to.have.property("cart");
          expect(res.body.name).to.equal("orvin");
          expect(res.body.email).to.equal("orvin@mail.com");
          expect(res.body.password).to.not.equal("orvin123");
          expect(res.body.cart.length).to.equal(0);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /login", () => {
    it("should send token with 200 status code", done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "orvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("token");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /login", () => {
    it("should send token with 404 status code", done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "orvin@mail.com", password: "orvin" })
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("Invalid email or password!");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /login", () => {
    it("should send token with 404 status code", done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("Invalid email or password!");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /login", () => {
    it("should send token with 404 status code", done => {
      chai
        .request(app)
        .post("/login")
        .send({ email: "asd", password: "" })
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("Invalid email or password!");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /login", () => {
    it("should send token with 404 status code", done => {
      chai
        .request(app)
        .post("/login")
        .send({ asd: "orvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal("Invalid email or password!");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  
});
