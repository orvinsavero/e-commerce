const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const { deleteProduct } = require("./helpers/deleteDb.js");

chai.use(chaiHttp);

const expect = chai.expect;
let token = null;
let token2 = null;
let productId = null;
let productId2 = null;

describe("Product testing", () => {
  after(() => {
    deleteProduct();
  });
  describe("POST /register", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({
          name: "orvin",
          email: "savorvin@mail.com",
          password: "orvin123"
        })
        .then(res => {
          userId = res.body._id;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("password");
          expect(res.body).to.have.property("cart");
          expect(res.body.name).to.equal("orvin");
          expect(res.body.money).to.equal(0);
          expect(res.body.email).to.equal("savorvin@mail.com");
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
        .send({ email: "savorvin@mail.com", password: "orvin123" })
        .then(res => {
          token = res.body.token;
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
  describe("POST /register", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/register")
        .send({
          name: "orvin",
          email: "saverorvin@mail.com",
          password: "orvin123"
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("email");
          expect(res.body).to.have.property("password");
          expect(res.body).to.have.property("cart");
          expect(res.body.name).to.equal("orvin");
          expect(res.body.money).to.equal(0);
          expect(res.body.email).to.equal("saverorvin@mail.com");
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
        .send({ email: "saverorvin@mail.com", password: "orvin123" })
        .then(res => {
          token2 = res.body.token;
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
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token)
        .type("form")
        .send({
          name: "iPhone XS",
          quantity: 20,
          price: 1000,
          description: "Brand new in box (sealed)",
          category: "Phone"
        })
        .then(res => {
          productId = res.body._id;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("quantity");
          expect(res.body).to.have.property("created_at");
          expect(res.body.name).to.equal("iPhone XS");
          expect(res.body.category).to.equal("Phone");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token2)
        .type("form")
        .send({
          name: "iPhone XSSSS@S",
          quantity: 20,
          price: 1000,
          description: "Brand new in box (sealed)",
          category: "Phone"
        })
        .then(res => {
          productId2 = res.body._id;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("quantity");
          expect(res.body).to.have.property("created_at");
          expect(res.body.name).to.equal("iPhone XSSSS@S");
          expect(res.body.category).to.equal("Phone");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product", function() {
    it("should send an array with 200 status code", function(done) {
      chai
        .request(app)
        .get("/product")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /product", function() {
    it("should send an array with 200 status code", function(done) {
      chai
        .request(app)
        .get("/product")
        .set("token", "dsadasdadasda")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("PATCH /product/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/product/${productId}`)
        .set("token", token)
        .send({
          name: "Samsung Galaxy S10",
          price: 800
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.name).to.equal("Samsung Galaxy S10");
          expect(res.body.price).to.equal(800);
          done();
        });
    });
  });
  describe("PATCH /product/:id", function() {
    it("should send an object with 500 status code", function(done) {
      chai
        .request(app)
        .patch(`/product/${productId}`)
        .set("token", token)
        .send({
          name: "Samsung Galaxy S12",
          price: "abc"
        })
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal("Internal server error");
          done();
        });
    });
  });
  describe("DELETE /product/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .delete(`/product/${productId}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.deletedCount).to.equal(1);
          done();
        });
    });
  });
  describe("DELETE /product/:id", function() {
    it("should send an object with 500 status code", function(done) {
      chai
        .request(app)
        .delete(`/product/asd9asd8asd`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal("Internal server error");
          done();
        });
    });
  });
  describe("DELETE /product/:id", function() {
    it("should send an object with 401 status code", function(done) {
      chai
        .request(app)
        .delete(`/product/${productId}`)
        .set("token", "asdasdadasdadadas")
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        });
    });
  });
  describe("DELETE /product/:id", function() {
    it("should send an object with 401 status code", function(done) {
      chai
        .request(app)
        .delete(`/product/${productId2}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Forbidden");
          done();
        });
    });
  });
  describe("PATCH /topup", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/topup`)
        .set("token", token)
        .send({
          money: 800
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.money).to.equal(800);
          done();
        });
    });
  });
  describe("PATCH /topup", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/topup`)
        .set("token", token)
        .send({
          money: 200
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.money).to.equal(1000);
          done();
        });
    });
  });
  describe("PATCH /topup", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/topup`)
        .set("token", token)
        .send({
          money: "200"
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body.money).to.equal(1200);
          done();
        });
    });
  });
  describe("PATCH /topup", function() {
    it("should send an object with 500 status code", function(done) {
      chai
        .request(app)
        .patch(`/topup`)
        .set("token", token)
        .send({
          money: "abc"
        })
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal("Internal server error");
          done();
        });
    });
  });
  describe("PATCH /cart/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart/${productId2}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.cart[res.body.cart.length - 1]._id).to.equal(
            productId2
          );
          done();
        });
    });
  });
  describe("PATCH /cart/:id", function() {
    it("should send an object with 500 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart/${productId}`)
        .set("token", token2)
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal("Internal server error");
          done();
        });
    });
  });
  describe("GET /cart", function() {
    it("should send an array with 200 status code", function(done) {
      chai
        .request(app)
        .get("/product")
        .set("token", token)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(1);
          expect(res.body[0]._id).to.equal(productId2);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /cart", function() {
    it("should send an array with 401 status code", function(done) {
      chai
        .request(app)
        .get("/product")
        .set("token", "asd")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("GET /cart", function() {
    it("should send an array with 401 status code", function(done) {
      chai
        .request(app)
        .get("/product")
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("PATCH /cart/remove/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart/remove/${productId}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.cart.length).to.equal(1);
          done();
        });
    });
  });
  describe("PATCH /cart/remove/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart/remove/${productId2}`)
        .set("token", token2)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.cart.length).to.equal(0);
          done();
        });
    });
  });
  describe("PATCH /cart/remove/:id", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart/remove/${productId2}`)
        .set("token", token)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.cart.length).to.equal(0);
          done();
        });
    });
  });
  describe("PATCH /cart/", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart`)
        .set("token", token)
        .send({
          money: 0,
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body.cart.length).to.equal(0);
          done();
        });
    });
  });
  describe("PATCH /cart/", function() {
    it("should send an object with 200 status code", function(done) {
      chai
        .request(app)
        .patch(`/cart`)
        .end(function(err, res) {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        });
    });
  });
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token)
        .type("form")
        .send({})
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("created_at");
          expect(res.body).to.have.property("UserId");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", 'asd')
        .type("form")
        .send({})
        .then(res => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal("Unauthorized");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token2)
        .type("form")
        .send({
          name: "iPhone 123@S",
          quantity: 20,
          price: 1000,
          description: "Brand new in box (sealed)",
          category: "Phone"
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("quantity");
          expect(res.body).to.have.property("created_at");
          expect(res.body.name).to.equal("iPhone 123@S");
          expect(res.body.category).to.equal("Phone");
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
  describe("POST /product", () => {
    it("should send an object with 201 status code", done => {
      chai
        .request(app)
        .post("/product")
        .set("token", token2)
        .type("form")
        .send({
          name: "asdasd 123@S",
          quantity: 20,
          price: '1000',
          description: "Brand new in box (sealed)",
          category: "Phone"
        })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("name");
          expect(res.body).to.have.property("price");
          expect(res.body).to.have.property("quantity");
          expect(res.body).to.have.property("created_at");
          expect(res.body.name).to.equal("asdasd 123@S");
          expect(res.body.price).to.equal(1000);
          done();
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});
