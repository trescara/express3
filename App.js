const express = require('express');
var morgan = require('morgan');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const students = require("./students.json")
app.use(morgan('tiny'));


function findById(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      return data[i];
    }
  }
  return null;
}


app.use(cors());


// app.listen(port, () => {
//   app.get("/", function (request, response) {
//     response.json({ data: students });
//   });

  app.get("/:id", function (request, response) {
    var record = findById(students, request.params.id);
    if (!record) {
      response.status = 404;
      response.json({
        error: {
          message: "No record found!"
        }
      });
    }

    response.json({ data: record });


  })
})