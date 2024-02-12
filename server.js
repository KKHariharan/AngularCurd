// Load HTTP module
const express = require("express");
const app = express()
const hostname = "127.0.0.1";
const port = 5000;

const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/popup_task')
  .then(() => console.log('Connected!'));

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json());

const Router = require("./controller/list");
 app.use("/list", Router);

// Prints a log once the server starts listening
app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
// const dbName = 'sampleTask2';

// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {
//   if (err) throw err;

//   const db = client.db(dbName);

//   // Insert data into the MongoDB collection
//   await db.collection('list').insertMany([
//     { name: 'M2', age: 1, desigination: 'manger' },
//     { name: 'emp2', age: 1, desigination: 'employee', manager_id: 3 }
//   ]);

//   // Query to find all documents in the list collection
//   const allDocuments = await db.collection('list').find({}).toArray();
//   console.log('All Documents:');
//   console.log(allDocuments);

//   // Query to find documents with desigination 'manger'
//   const managers = await db.collection('list').find({ desigination: 'manger' }).toArray();
//   console.log('Managers:');
//   console.log(managers);

//   // Query to find documents with desigination 'employee'
//   const employees = await db.collection('list').find({ desigination: 'employee' }).toArray();
//   console.log('Employees:');
//   console.log(employees);

//   // Query to perform a left join equivalent
//   const result = await db.collection('list').aggregate([
//     {
//       $lookup: {
//         from: 'list',
//         localField: 'manager_id',
//         foreignField: 'id',
//         as: 'manager'
//       }
//     },
//     {
//       $project: {
//         employee_id: '$id',
//         employee_name: '$name',
//         employee_age: '$age',
//         employee_desigination: '$desigination',
//         manager_id: { $arrayElemAt: ['$manager.id', 0] },
//         manager_name: { $arrayElemAt: ['$manager.name', 0] }
//       }
//     },
//     {
//       $sort: { employee_id: 1 }
//     }
//   ]).toArray();

//   console.log('Left Join Equivalent:');
//   console.log(result);

//   client.close();
// });
