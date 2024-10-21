// backend/src/app.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const soap = require('soap');
const cors = require('cors'); // Importar el middleware cors

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Usar el middleware cors

// Conectar a la base de datos
/*const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hola desde el backend' });
});

*/
// Ruta para consumir el servicio SOAP
app.get('/api/fullCountryInfo/:countryCode', (req, res) => {
  const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
  const countryCode = req.params.countryCode;

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error('Error creando el cliente SOAP:', err);
      res.status(500).send('Error creando el cliente SOAP');
      return;
    }

    client.FullCountryInfo({ sCountryISOCode: countryCode }, (err, result) => {
      if (err) {
        console.error('Error llamando al método FullCountryInfo:', err);
        res.status(500).send('Error llamando al método FullCountryInfo');
        return;
      }

      res.json(result);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
