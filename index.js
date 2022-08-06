/*
            _ _ 
       __ _| (_)
      / _` | | |
     | (_| | | |
      \__,_|_|_|         
*/
const Courses = require("./data.js");
const express = require("express");
const port = 3000;
const app = express();
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const finish = Date.now();
  console.log(`${req.method} ${req.url} Time: ${finish - start}`);
});
app.use(express.json());

app.post("/courses", (req, res) => {
  Courses.push({
    id: Courses.length,
    title: req.body.title,
    price: req.body.price,
    keywords: req.body.keywords,
  });
  res.send(Courses);
});
app.get("/", (req, res) => {
  res.send("<h1>Main Page</h1>");
});
app.get("/courses", (req, res) => {
  res.send(Courses);
});
app.get("/courses/:IdCourse", (req, res) => {
  let CourseID = req.params.IdCourse;
  if (!(CourseID < 0 || CourseID > Courses.length - 1)) {
    res.send(Courses[+CourseID]);
  } else {
    res.status(404).send({
      ERROR: "NOT FOUND",
    });
  }
});
app.listen(port, () => {
  console.log("listen ... ");
});
