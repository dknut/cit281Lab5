//Module Import
const fastify = require("fastify")();

//Student Object
const students = [
  {
    id: 1,
    last: "John",
    first: "Scott",
  },
  {
    id: 2,
    last: "Fred",
    first: "Martin",
  },
  {
    id: 3,
    last: "Jimmy",
    first: "Johns",
  },
];

//Student route
fastify.get("/cit/student", (request, reply) => {
  reply.code(200).header("Content-Type", "application/json").send(students);
});

//ID route
fastify.get("/cit/student/:id", (request, reply) => {
  //REQUEST, in PARAMS, named ID
  requestID = request.params.id;

  //Initialize
  let studentSend = null;

  //Loop over the entire array
  //If the one we're on's ID is the same as the request
  //That student is the one we want to send
  for (studentInArray of students) {
    if (studentInArray.id == requestID) {
      studentSend = studentInArray;
      break;
    }
  }

  if (studentSend != null) {
    reply
      .code(200)
      .header("Content-Type", "application/json")
      .send(studentSend);
  } else {
    reply
      .code(404)
      .header("Content-Type", "text/html")
      .send("<h1>Not Found</h1>");
  }
});

//Wildcard route
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/html")
    .send(`<>${"This is not a valid page"}</>`);
});

//Add Student Using Post
fastify.post("/cit/student/add", (request, reply) => {
  console.log(request);

  //Get Info from client
  const objectFromClient = JSON.parse(request.body);
  console.log(objectFromClient);

  //Do something with that info
  //Find the current max ID from object
  let maxID = 0;
  //Do loop
  for (studentInArray of students) {
    if (studentInArray.id > maxID) {
      maxID = studentInArray.id;
    }
  }
  //Create a student object with first, last and id
  createdStudent = {
    id: maxID + 1,
    first: objectFromClient.first,
    last: objectFromClient.last,
  };

  //Push to the students array
  students.push(createdStudent);

  //Send reply with new student
  reply
    .code(200)
    .header("Content-Type", "application/json")
    .send(createdStudent);
});

//Listen Base
const listenIP = "localhost";
const listenPort = 8080;
//Listening
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    //Log error and exit
    console.log(err);
    process.exit(1);
  }
  //Display IP and Port of running server
  console.log(`Server listening on ${address}`);
});
