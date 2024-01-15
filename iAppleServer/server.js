const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const port = 3000;

const app = express();
app.use(cors());

// Konfiguracija MySQL baze podataka
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iApple'
});

// Povezivanje sa bazom
db.connect((err) => {
  if (err) {
    console.log('Unable to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Omogućavanje JSON parsiranja za POST zahteve
app.use(bodyParser.json());

// Endpoint za čitanje svih telefona
app.get('/phones', (req, res) => {
  db.query('SELECT * FROM phones', (err, result) => {
    if (err) {
      console.log('Error reading phones from the database:', err);
      res.status(500).send('Error reading phones from the database');
    } else {
      res.json(result);
    }
  });
});

// Endpoint za dodavanje novog telefona
app.post('/phones', (req, res) => {
  const { marka, model, cena } = req.body;

  db.query('INSERT INTO phones (marka, model, cena) VALUES (?, ?, ?)', [marka, model, cena], (err, result) => {
    if (err) {
      console.log('Error adding a new phone to the database:', err);
      res.status(500).send('Error adding a new phone to the database');
    } else {
      const insertedPhoneId = result.insertId;
      console.log('Inserted phone:', { id: insertedPhoneId, marka, model, cena });
      res.json({ id: insertedPhoneId, marka, model, cena });
    }
  });
});

// Endpoint za ažuriranje telefona
app.put('/phones/:id', (req, res) => {
  const phoneId = req.params.id;
  const { marka, model, cena } = req.body;

  db.query('UPDATE phones SET marka=?, model=?, cena=? WHERE phoneId=?', [marka, model, cena, phoneId], (err) => {
    if (err) {
      console.log('Error updating the phone in the database:', err);
      res.status(500).send('Error updating the phone in the database');
    } else {
      res.send('Phone updated successfully');
    }
  });
});

// Endpoint za brisanje telefona
app.delete('/phones/:id', (req, res) => {
  const phoneId = req.params.id;

  db.query('DELETE FROM phones WHERE phoneId=?', [phoneId], (err) => {
    if (err) {
      console.log('Error deleting the phone from the database:', err);
      res.status(500).send('Error deleting the phone from the database');
    } else {
      res.send('Phone deleted successfully');
    }
  });
});

// Slušanje na određenom portu
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
