// Require the Fastify framework and instantiate it
const fastify = require("fastify")();
const {getStudentById, getStudents, addToStudents} = require("./lab-modules.js")
// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax
fastify.get("/cit/student", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(getStudents());
});

fastify.post("/cit/student", (request, reply) => {
  console.log(request.body)

  const {first, last} = request.body
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(addToStudents(first, last));
});

fastify.get("/cit/student/:id", (request, reply) => {
  console.log(request.params)
  const {id} = request.params
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(getStudentById(id));
  });

  fastify.get("*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({error: "Route not found!"});
  });


// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
