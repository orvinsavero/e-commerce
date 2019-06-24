const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteUser } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;

describe("User register", () => {
  after(() => {
    deleteUser();
  });
  describe("POST /register", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "orvin", email: "sorvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("password");
          expect(res.body).to.have.property("cart");
          expect(res.body.name).to.equal("orvin");
          expect(res.body.email).to.equal("sorvin@mail.com");
          expect(res.body.password).to.not.equal("orvin123");
          expect(res.body.cart.length).to.equal(0);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("should send an object with 400 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "orvin", email: "sorvin@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            "User validation failed: email: Validator failed for path `email` with value `sorvin@mail.com`"
          );
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("should send an object with 400 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "orvin", email: "orvinmailcom", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            "User validation failed: email: orvinmailcom invalid email format!"
          );
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("should send an object with 400 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "", email: "orvin2@mail.com", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            "User validation failed: name: Name is required"
          );
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("should send an object with 400 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "asd", email: "", password: "orvin123" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            "User validation failed: email: Email is required"
          );
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
    it("should send an object with 400 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({ name: "asdasd", email: "orvindd2@mail.com", password: "" })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal(
            "User validation failed: password: Password is required"
          );
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});
