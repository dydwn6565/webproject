const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userID",
    secret: "thisisourapp",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, //ms: how long the cookies remain
    },
  })
);
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "4537db",
});

db.promise = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(new Error());
      } else {
        resolve(result);
      }
    });
  });
};
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

// const verifyJWT = (req, res, next) => {
//   const token = req.headers["x-access-token"];
//   if (!token) {
//     res.send("No token");
//   } else {
//     jwt.verify(token, "jwtSecret", (err, decoded) => {
//       if (err) {
//         res.json({ auth: false, message: "Failed to authenticate.." });
//       } else {
//         req.userID = decoded.id;
//         next();
//       }
//     });
//   }
// };

app.get("/authUser", (req, res) => {
  const token = req.headers["x-access-token"];
  // console.log(token);
  if (!token) {
    res.status(401).send("No token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ auth: false, message: "Failed to authenticate.." });
      } else {
        req.userID = decoded.id;
        // console.log(decoded.email);
        res.send(decoded.email);
      }
    });
  }
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // console.log("line89" + password);
  db.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      // console.log("line96");
      // console.log(result[0].password);
      bcrypt.compare(password, result[0].password, (error, response) => {
        // console.log("line98");
        // console.log(response);
        if (response) {
          // console.log("line100");
          req.session.user = result;
          const email = result[0].email;
          // console.log(id);
          // console.log(result[0].email);
          const token = jwt.sign({ email }, "jwtSecret", {
            expiresIn: 3600, //5mins
          });
          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        } else {
          res.json({ auth: false, message: "Wrong email and password!" });
        }
      });
    } else {
      res.json({ auth: false, message: "No user exists!" });
    }
  });
});

app.post("/addCountRequest", (req, res) => {
  let apiAddress = req.body.apiAddress;
  console.log(apiAddress);
  console.log(req.body);

  let getUserId = `SELECT userID from users where email= "${req.body.userEmail}"`;

  db.promise(getUserId, (err, result) => {
    if (err) throw err;
  }).then((result) => {
    console.log("line156");
    console.log(result[0].userID);

    // let insertCountToAdmin = `insert admin(${apiAddress} values(${
    //   apiAddress + 1
    // }) where userID=${result[0].userID}`;
    // let insertCountToAdmin = `update admin set "${apiAddress}" = ${(apiAddress =
    //   apiAddress + 1)}} where userID=${result[0].userID}`;

    // let insertCountToAdmin = `update admin set postMedicalStaff = 1 where userID=${result[0].userID}`;
    let insertCountToAdmin = `update admin set ${apiAddress} = ${apiAddress}+1 where userID=${result[0].userID}`;
    db.promise(insertCountToAdmin, (err, result) => {
      if (err) throw err;
    }).then((result) => {
      console.log("success");
      res.send("success");
    });
  });
});

app.post("/insertUserId", (req, res) => {
  // let apiAddress = req.body.address;
  console.log(req.body.userEmail);

  let getUserId = `SELECT userID from users where email= "${req.body.userEmail}"`;

  db.promise(getUserId, (err, result) => {
    if (err) throw err;
  }).then((result) => {
    console.log("line176");
    console.log(result[0].userID);
    // console.log(result[0]["userId"]);
    let insertUserId = `insert ignore admin(userID) values(${result[0].userID})`;
    db.promise(insertUserId, (err, result) => {
      if (err) throw err;
    }).then((result) => {
      res.send("success");
    });
  });
});

app.post("/post/medicalStaff", (req, res) => {
  // console.log(req.body);
  let checkDupStart = `Select count(*) from medicalstaff where (name="${
    req.body.name
  }" and position="${req.body.position}" and  "${
    req.body.startTime
  }" Between start_at And end_at) or (name="${req.body.name}" and position="${
    req.body.position
  }" and  "${
    req.body.endDate + " " + req.body.endTime
  }" Between start_at And end_at) or  (name = "${
    req.body.name
  }" and position="${req.body.position}" and  start_at Between "${
    req.body.startTime
  }" and "${req.body.endDate + " " + req.body.endTime}") `;

  let inSertMedicalStaff = `INSERT INTO medicalstaff(name,position,start_at,end_at,patientID) values("${
    req.body.name
  }","${req.body.position}","${req.body.startTime}","${
    req.body.endDate + " " + req.body.endTime
  }",${req.body.patientID})`;

  db.promise(checkDupStart, (err, result) => {
    if (err) {
      throw err;
    }
  }).then((result) => {
    if (result[0]["count(*)"] > 0) {
      res.send("can not set this time");
    } else {
      db.query(inSertMedicalStaff),
        (err, result) => {
          if (err) {
            throw err;
          }
          // console.log("instered");
          res.send("instered");
        };
    }
  });
});

app.get("/get/medicalStaff", (req, res) => {
  db.query("SELECT * FROM medicalstaff", (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.put("/put/medicalStaff", (req, res) => {
  // console.log(req.body);
  let checkDupStart = `Select count(*) from medicalstaff where (name = "${
    req.body.name
  }" and position="${req.body.position}" and "${
    req.body.startDate + " " + req.body.startTime
  }" Between start_at and end_at) or (name = "${req.body.name}" and position="${
    req.body.position
  }" and  "${
    req.body.endDate + " " + req.body.endTime
  }" Between start_at and end_at) or  (name = "${
    req.body.name
  }" and position="${req.body.position}" and  start_at Between "${
    req.body.startDate + " " + req.body.startTime
  }" and "${req.body.endDate + " " + req.body.endTime}") `;

  db.promise(checkDupStart, (err, result) => {
    if (err) {
      throw err;
    }
  }).then((result) => {
    let updateMedicalStaff = `UPDATE  medicalstaff set name = "${
      req.body.name
    }", position ="${req.body.position}",start_at = "${
      req.body.startTime
    }",end_at="${
      req.body.endDate + " " + req.body.endTime
    }" where Id =${parseInt(req.body.updateNum)}`;

    // console.log(result);
    if (result[0]["count(*)"] > 0) {
      res.send("can not set this time");
    } else {
      db.query(updateMedicalStaff),
        (err, result) => {
          if (err) {
            throw err;
          }
          // console.log("instered");
          res.send("instered");
        };
    }
  });
});

app.delete("/delete/medicalStaff", (req, res) => {
  // console.log(req.body.updateNum);
  let reSetNum = "ALTER TABLE medicalstaff AUTO_INCREMENT =1";
  let deleRow = `DELETE FROM medicalstaff where id=${req.body.updateNum}`;

  db.promise(deleRow, (err, result) => {
    if (err) {
      throw err;
    }
  }).then((result) => {
    // console.log("inside delete");
    db.query(reSetNum),
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log("delete success 308");
        res.send("instered");
      };
  });
});

//////////////////////////
app.post("/createPatient", (req, res) => {
  const name = req.body.name;
  const city = req.body.city;
  const mobile = req.body.mobile;
  const gender = req.body.gender;
  const date = req.body.date;
  const time = req.body.time;
  console.log(`line 117: ${time}`);

  db.query(
    "INSERT INTO patient (name, city, mobile, gender, date) VALUES (?, ?, ?, ?, ?)",
    [name, city, mobile, gender, date + " " + time],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Inserted!");
      }
    }
  );
});

app.get("/patientList", (req, res) => {
  db.query("SELECT * FROM patient", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatePatient", (req, res) => {
  const ID = req.body.ID;
  const name = req.body.name;
  const city = req.body.city;
  const mobile = req.body.mobile;
  const gender = req.body.gender;
  const date = req.body.date;
  const time = req.body.time;
  console.log(`line 150: ${time}`);
  db.query(
    "UPDATE patient SET name = ?, city = ?, mobile = ?, gender = ?, date = ? WHERE ID = ?",
    [name, city, mobile, gender, date + " " + time, ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/deletePatient/:ID", (req, res) => {
  const ID = req.params.ID;
  db.query("DELETE FROM patient WHERE ID = ?", ID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updateReserved", (req, res) => {
  const patientID = req.body.patientID;
  // console.log("line 336" + patientID);
  db.query(
    "UPDATE patient SET reservedState = 1 WHERE ID = ?",
    [patientID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateNotReserved", (req, res) => {
  const patientID = req.body.patientID;
  // console.log("line330");
  // console.log("line 330 " + patientID);
  db.query(
    "UPDATE patient SET reservedState = 0 WHERE ID = ?",
    [patientID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/totalServerRequest/:id", (req, res) => {
  console.log(req.params.id);
  console.log("line415");
  let getUserId = `SELECT userID from users where email= "${req.params.id}"`;
  db.promise(getUserId, (err, result) => {
    if (err) throw err;
  }).then((result) => {
    console.log(result[0].userID);
    let userID = result[0].userID;
    let getServerRequest = `SELECT * from admin where userID=${userID}`;
    db.query(getServerRequest, (err, result) => {
      console.log(result[0]);
      res.send(result[0]);
    });
  });
});
app.listen(8001, (req, res) => {
  console.log("Server running...");
});
