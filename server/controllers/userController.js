const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "student"
});

// View Users
exports.view = (req, res) => {
  
  connection.query('SELECT * FROM student WHERE status = "active" LIMIT 5', (err, rows) => {
    
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// View result
exports.views = (req, res) => {
  
  connection.query('SELECT DISTINCT id  FROM result ORDER BY id LIMIT 5', (err, rows) => {
    
    if (!err) {
      let removedUser = req.query.removed;
      res.render('result', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}
//adminLogin
exports.adminLogin = (req, res) => {
  var user ="admin";
  var password=123;
  console.log("login function working")
  if (req.body.name == user && req.body.pass == password) {
      console.log("logedin")
      
  connection.query('SELECT DISTINCT id  FROM result ORDER BY id LIMIT 5', (err, rows) => {
    
    if (!err) {
      let removedUser = req.query.removed;
      res.render('result', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
      
      // res.render('result', { rows, removedUser });
    } else {
      console.log("loginerrr");
    }
  
}
//user Login
exports.userLogins = (req, res) => {
  console.log('userLogin')
    var sql = "select * from student where email = ? and  phone = ?"
    console.log()
    connection.query("select * from student where email = ? and  phone = ?",[req.body.name,req.body.pass],(err,row)=>{
      if(err){
        console.log(err)
      }else{
        console.log(row)
        if(row.length > 0){
          res.render('userProfile',{data :row[0],homePage:true})  
        }else{
          console.log('userNot exist')
        }
        // req.sesion.user = row[0]
        // console.log("sessionCreated",req.sesion.user)
       
      }
    })
  
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  
  connection.query('SELECT * FROM student WHERE id LIKE ? OR name LIKE ? OR gender LIKE ? OR department LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%',  '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if(rows ==0 ){
      res.render('home', { alert: 'Student Not found.' });

    }
   else  if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

exports.finds = (req, res) => {
  let searchTerm = req.body.sr;
  
  connection.query('SELECT DISTINCT id FROM result WHERE id LIKE ?', ['%' + searchTerm + '%'  ], (err, rows) => {
    if(rows ==0 ){
      res.render('result', { alert: 'Result Not found.' });
    }
    else if (!err) {
      res.render('result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}
exports.userLogin = (req, res) => {
  res.render('userLogin',{homePage:true});
}
exports.log = (req, res) => {
  res.render('add-log');
}

// Add new user
exports.create = (req, res) => {
  const { id, name, batch, gender, department, phone, email } = req.body;
  let searchTerm = req.body.search;


  connection.query('INSERT INTO student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ?', [id, name, batch, gender, department, phone, email], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Student added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

//addlog
exports.addLog = (req, res) => {
  console.log(req.body)
 var data = req.body
connection.query('insert into log set ?',data, (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'log added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}



exports.forms = (req, res) => {
  res.render('add-result');
}
exports.login = (req, res) => {
  // res.render('adminLogin');
  res.render('homeindex',{homePage:true})
}
//admin login
exports.adminlogin = (req, res) => {
  // res.render('adminLogin');
  res.render('adminLogin',{homePage:true})
}
// Add new result
exports.creates = (req, res) => {
  const { id, semester, cgpa } = req.body;
  let searchTerm = req.body.search;


  connection.query('INSERT INTO result SET id = ?, semester = ?, cgpa = ?', [id, semester, cgpa], (err, rows) => {
    if (!err) {
      res.render('add-result', { alert: 'Result added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}




// Edit user
exports.edit = (req, res) => {

  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { id, name, batch, gender, department, phone, email } = req.body;

  connection.query('UPDATE student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ? WHERE id = ?', [ id, name, batch, gender, department, phone, email, req.params.id], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => { 
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from student table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  connection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if(!err) {
      res.redirect('/view');
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });

  // Hide a record

  // connection.query('UPDATE student SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('Student successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from student table are: \n', rows);
  // });
}

// View Users
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}
//view log

exports.viewLog = (req, res) => {
  connection.query('SELECT * FROM log WHERE studentID = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('viewLog', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

// View Results by id
exports.viewalls = (req, res) => {
  // connection.query('SELECT * FROM student INNER JOIN result ON student.id = result.id WHERE student.id = ?', [req.params.id], (err, rows) => {
     connection.query('SELECT * FROM student NATURAL JOIN result WHERE id = ? ORDER BY semester', [req.params.id], (err, rows) => {

    if (!err) {
      res.render('view-result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}


exports.myresult = (req, res) => {
    var sql = "select * from result where id= ?"
    connection.query(sql,[req.params.id],(err,row)=>{
      if(err){
        console.log(err)
      }else{
        res.render('myResult',{data:row,homePage:true})
      }
    })
}

exports.myattendance = (req, res) => {
  var sql = "select * from log where studentID= ?"
  connection.query(sql,[req.params.id],(err,row)=>{
    if(err){
      console.log(err)
    }else{
      res.render('myAttendance',{data:row,homePage:true})
    }
  })
}