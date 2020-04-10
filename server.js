const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(cors());

dotenv.config();

const Student = require('./models/Student');

const PORT = process.env.PORT || 3000;

const apiEndpoint = process.env.ENDPOINT || 'api/v1';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Nothing to see here.');
});

app.get(`/${apiEndpoint}`, (req, res) => {
  res.send('Nothing to see here.');
});

// POST route to add a student
app.post(`/${apiEndpoint}/student`, (req, res) => {
  // destructuring the body object in req
  const { firstName, lastName, email, phone, studentId, city } = req.body;

  // Create the student record in the database
  Student.create({
    firstName,
    lastName,
    email,
    phone,
    studentId,
    city,
  })
    .then((student) => {
      res.status(201).json({
        success: true,
        data: student,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
});

// GET route to get a single student's record
app.get(`/${apiEndpoint}/student/:studentId`, (req, res) => {
  // Get the studentId from the params :studentId
  const { studentId } = req.params;

  // Get the student record from the database
  Student.findOne({
    where: {
      studentId,
    },
  })
    .then((student) => {
      res.status(200).json({
        success: true,
        data: student,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
});

// GET all students
app.get(`/${apiEndpoint}/students/:page?/:limit?`, async (req, res) => {
  // Get optional page and limit params from req.params
  let { page, limit } = req.params;

  // If page is given, cast to int, else set to 1
  page = page ? parseInt(page) : 1;

  // If limit is given, cast to int, else set to 10
  limit = limit ? parseInt(limit) : 10;

  // Offset, from which entry to start
  const offset = (page - 1) * limit;

  // Endindex - the last entry in the query based on the offset and limit
  const endIndex = offset + limit;

  // Total number of student entries in the database
  const totalRows = await Student.count();

  // Pagination object
  const pagination = {};

  // If the endIndex is less that the total rows, there is a next page
  if (endIndex < totalRows) {
    pagination.next = {
      page: ++page,
      limit,
    };
  }

  // If the offset is greater than 0, there is a previous page
  if (offset > 0) {
    pagination.prev = {
      page: --page,
      limit,
    };
  }

  // Get student data based on offset and limit
  Student.findAll({
    offset,
    limit,
  })
    .then((students) => {
      res.status(200).json({
        success: true,
        data: students,
        pagination,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
});

// PUT route to update a student's records
app.put(`/${apiEndpoint}/student/:studentId`, (req, res) => {
  // Get the studentId from the params :studentId
  const { studentId } = req.params;

  // destructuring the body object in req
  const { firstName, lastName, email, phone, city } = req.body;

  // Update the student record in the database
  Student.update(
    {
      firstName,
      lastName,
      email,
      phone,
      city,
    },
    {
      where: {
        studentId,
      },
    }
  )
    .then((rows) => {
      res.status(201).json({
        success: true,
        data: rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
});

// DELETE route to delete a student's record
app.delete(`/${apiEndpoint}/student/:studentId`, (req, res) => {
  // Get the studentId from the params :studentId
  const { studentId } = req.params;

  // Delete the student record in the database
  Student.destroy({
    where: {
      studentId,
    },
  })
    .then((rows) => {
      res.status(201).json({
        success: true,
        data: rows,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
