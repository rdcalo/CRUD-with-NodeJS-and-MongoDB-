const Blog = require("../models/Blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.should();
chai.use(chaiHttp);

describe("Blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  describe("/GET blog", () => {
    it("it should GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST blog", () => {
    it("it should POST a new blog", (done) => {
      let blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2"
      };
      chai
        .request(app)
        .post("/api/blogs")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("object");
          res.body.status.should.be.eql("success");
          done();
        });
    });
  });

  describe("/GET/:id blog", () => {
    it("it should GET a blog by the id", async () => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2"
      });
      const savedBlog = await blog.save();
      
      const res = await chai.request(app).get("/api/blogs/" + savedBlog.id);
      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
    });
  });

  describe("/PUT/:id blog", () => {
    it("it should UPDATE a blog given the id", async () => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2"
      });
      const savedBlog = await blog.save();

      const res = await chai
        .request(app)
        .put("/api/blogs/" + savedBlog.id)
        .send({
          title: "The first blog was updated",
          body: "This is a blog post",
          image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2"
        });
      
      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
    });
  });

  describe("/DELETE/:id blog", () => {
    it("it should DELETE a blog given the id", async () => {
      let blog = new Blog({
        title: "This is the first blog",
        body: "This is a blog post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2"
      });
      const savedBlog = await blog.save();

      const res = await chai.request(app).delete("/api/blogs/" + savedBlog.id);
      res.should.have.status(200);
      res.body.data.should.be.a("object");
      res.body.status.should.be.eql("success");
    });
  });
});