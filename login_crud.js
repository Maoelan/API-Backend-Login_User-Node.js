// Import modul
const express = require("express")
const mysql = require("mysql")

const app = express()

const port = 5011

var mydb = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "login_node"
})
mydb.connect()

app.use(express.json())

app.get('/', (req, res) => {
	console.log("Akses : /")

	res.send("Homepage Backend login")
})

app.post('/insert_data_login', (req, res) => {
    console.log("Akses : /insert_data_login")
    
    var id_login = req.body.id_login
	var username = req.body.username
	var nama_depan = req.body.nama_depan
	var nama_belakang = req.body.nama_belakang
    var email = req.body.email
    var password = req.body.password

	var query_create = "INSERT INTO login (id_login, username, nama_depan, nama_belakang, email, password) VALUES (?, ?, ?, ?, ?, ?)"
    var values_create = [id_login, username, nama_depan, nama_belakang, email, password]

	mydb.query(query_create, values_create, function (err, result, fields) {
		if (err) throw err
		console.log(result)

		 // Membuat respon untuk dikembalikan dalam format JSON
		var response_payload = {
			"description" : "Berhasil memasukkan data login",
			"mysql_response" : result
		}

		// Mengembalikan respon
		res.json(response_payload)
	})
})

// Melihat data siswa
app.get('/get_data_login', (req, res) => {
	console.log("Akses : /get_data_login")

	var query_read = "SELECT * FROM login WHERE 1 = 1 "

	// Jika terdapat parameter yang digunakan, tambahkan ke query
	if (req.query.id_login) {
		query_read += "AND id_login = " + mysql.escape(req.query.id_login)
	}

	// Eksekusi query
	mydb.query(query_read, function (err, result, fields) {
		if (err) throw err

		// Membuat respon untuk dikembalikan dalam format JSON
		var response_payload = {
			"description" : "Berhasil mendapatkan data login",
			"data" : result
		}

		// Mengembalikan respon
		res.json(response_payload)
	})
})

app.put('/update_data_login', (req, res) => {
    console.log("Akses : /update_data_login")

    var id_login = req.body.id_login
	var username = req.body.username
	var nama_depan = req.body.nama_depan
	var nama_belakang = req.body.nama_belakang
    var email = req.body.email
    var password = req.body.password

    var query_update = "UPDATE login SET id_login=id_login"

    if (username) {
        query_update += " ,username= " + mysql.escape(username)
    }

    if (nama_depan) {
        query_update += " ,nama_depan= " + mysql.escape(nama_depan)
    }

    if (nama_belakang) {
        query_update += " ,nama_belakang= " + mysql.escape(nama_belakang)
    }

    if (email) {
        query_update += " ,email= " + mysql.escape(email)
    }

    if (password) {
        query_update += " ,password= " + mysql.escape(password)
    }

    query_update += "WHERE id_login = " + mysql.escape(id_login)

    
    mydb.query(query_update, function (err, result, fields) {
		if (err) throw err
		console.log(result)

		 // Membuat respon untuk dikembalikan dalam format JSON
		var response_payload = {
			"description" : "Berhasil mengupdate data login",
			"mysql_response" : result
		}

		// Mengembalikan respon
		res.json(response_payload)
	})
})

app.delete("/delete_data_login", (req, res) => {
    console.log("Akses : /delete_data_login")

    var id_login = req.query.id_login

    var query_delete = "DELETE from login WHERE id_login = " + mysql.escape(id_login)

    mydb.query(query_delete, function (err, result, fields) {
        if (err) throw err

        var response_payload = {
            "description": "Berhasil menghapus data login",
            "data" : result
        }

        res.json(response_payload)
    }) 
})

// Menjalankan server
app.listen(port, () => {
	console.log("Server berjalan pada URL : http://localhost:"+port)
})

