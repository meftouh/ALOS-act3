const app = require('../v1/index');
//assert 
let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);
//GET
describe("GET /annonces_ventes", () => {
 it("respond with json containing a list of all annonces_ventes", (done) => {
  chai.request(app)
      .get("/annonces_ventes")
    

      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.not.be.eq(0);


        done();
      });
      });
});
//get by id
describe("GET /annonces_ventes/:id", () => {
  it("respond with json containing a single annonces_ventes", (done) => {
    chai.request(app)
      .get("/annonces_ventes/1")
     
      .end((err, response) => {
        response.should.have.status(200);

        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('titre');//maybe source?
        response.body.should.have.property('user');
        response.body.should.have.property('id').eq(1);


        done();
      });
      });
///  GET not_found"
  it("respond with json annonces_ventes not found when the annonces_ventes does not exists", (done) => {
    chai.request(app)
      .get("/annonces_ventes/nonexistingannonces_ventes")
    
      .end((err, response) => {
        response.should.have.status(404);
        response.text.should.be.eq('"annonces_ventes_not_found"');

          done();
      });
  });
});
//POST
describe('POST /annonces_ventes',  ()=>  {
 
  it('respond with 200 created',  (done) => {
    const data = {  

      
        
        titre: "Enim id mollit ex consectetur.",
        date_de_creation: "2022-03-15",
        categories: "villa",
                    pays: "Netherlands",
            ville: "Villanova d'Ardenghi",
            rue: "822 Anita Union"
        ,
        superficie: "530",
        prix: "$724,355.81",
        pieces: 8,
        etage: 6,
        specifications: "'electricity' 'garage'  ",
            user: "Joany_Schneider95",
            telephone: "753-923-4955",
            email: "johanna.hartmann51@yahoo.com"
   
  
    }
          chai.request(app)
          .post('/annonces_ventes')
          .send(data)
          

          .end((err, response) => {
            response.should.have.status(200);
       response.body.should.be.a('object');
         response.body.should.have.property('titre').eq("Enim id mollit ex consectetur.");
         response.body.should.have.property('date_de_creation').eq("2022-03-15");
         response.body.should.have.property('categories').eq("villa");
         response.body.should.have.property('pays').eq("Netherlands");
         response.body.should.have.property('ville').eq("Villanova d'Ardenghi");
         response.body.should.have.property('rue').eq("822 Anita Union");
         response.body.should.have.property('superficie').eq("530");
         response.body.should.have.property('prix').eq("$724,355.81");
         response.body.should.have.property('pieces').eq(8);

         response.body.should.have.property('etage').eq(6);
         response.body.should.have.property('specifications').eq("'electricity' 'garage'  ");
         response.body.should.have.property('user').eq("Joany_Schneider95");
         response.body.should.have.property('telephone').eq("753-923-4955");
         response.body.should.have.property('email').eq("johanna.hartmann51@yahoo.com");



            done();
          });
  });
});

//// post  not created
describe('POST /annonces_ventes',  () => {
  let data = {
     

      
          }
  it('respond with 400 not created',  (done)=>  {
    chai.request(app)
          .post('/annonces_ventes')
          .send(data)
         
          
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.be.eq("annonces_ventes not created");

              done();
          });
  });
});



///DELETE
describe('DELETE /annonces_ventes/:id',  (done)=>  {
  it('Deletes a particular annonces_ventes',  (done)=>  {
    chai.request(app)
  .delete('/annonces_ventes/8')
  .end((err, response) => {
    response.should.have.status(200);

      done();
  });  
});
it('Deletes a particular annonces_ventes',  (done)=>  {
  chai.request(app)
.delete('/annonces_ventes/800')
.end((err, response) => {
  response.should.have.status(400);
  response.text.should.be.eq('"annonces_ventes_not_found"');

    done();
});  
});
  });


//PUT
  describe("PUT /annonces_ventes/:id",  (done)=>  {
    it("Updates a particular annonces_ventes",  (done)=>  {
      const Id = 12;
      const data = {  

      
        
        titre: "Enim id mollit ex consectetur.",
        date_de_creation: "2022-03-15",
        categories: "villa",
                    pays: "Netherlands",
            ville: "Villanova d'Ardenghi",
            rue: "822 Anita Union"
        ,
        superficie: "530m",
        prix: "$724,355.81",
        pieces: 8,
        etage: 6,
        specifications: "'electricity' 'garage'  ",
            user: "Joany_Schneider95",
            telephone: "753-923-4955",
            email: "johanna.hartmann51@yahoo.com"
   
  
    };
      chai.request(app)
    .put("/annonces_ventes/"+ Id)
    .send(data)
    .end((err, response) => {
      response.should.have.status(200);
      response.body.should.be.a('object');
      response.body.should.have.property('titre').eq("Enim id mollit ex consectetur.");
      response.body.should.have.property('date_de_creation').eq("2022-03-15");
      response.body.should.have.property('categories').eq("villa");
      response.body.should.have.property('pays').eq("Netherlands");
      response.body.should.have.property('ville').eq("Villanova d'Ardenghi");
      response.body.should.have.property('rue').eq("822 Anita Union");
      response.body.should.have.property('superficie').eq("530m");
      response.body.should.have.property('prix').eq("$724,355.81");
      response.body.should.have.property('pieces').eq(8);

      response.body.should.have.property('etage').eq(6);
      response.body.should.have.property('specifications').eq("'electricity' 'garage'  ");
      response.body.should.have.property('user').eq("Joany_Schneider95");
      response.body.should.have.property('telephone').eq("753-923-4955");
      response.body.should.have.property('email').eq("johanna.hartmann51@yahoo.com");

        done();
    });  
    });
    it("It should NOT PUT an existing annonces_ventes ", (done) => {
      const Id = 12;
      const data = {
        titre: "Enim id mollit ex consectetur.",
        date_de_creation: "2022-03-15",
        categories: "villa",
                    pays: "",
            ville: "Villanova d'Ardenghi",
            rue: ""
        ,
        superficie: "",
        prix: "$724,355.81",
        pieces: 8,
        etage: 6,
        specifications: "'electricity' 'garage'  ",
            user: "Joany_Schneider95",
            telephone: "753-923-4955",
            email: ""
      };
      chai.request(app)
          .put("/annonces_ventes/" + Id)
          .send(data)
          .end((err, response) => {
            response.should.have.status(400);
            response.text.should.be.eq("non_PUT");
          done();
          });
  });
    });


    