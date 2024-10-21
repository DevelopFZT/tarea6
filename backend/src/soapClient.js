// backend/src/soapClient.js
const soap = require('soap');
const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';

const countryCode = 'US'; // Código del país que deseas consultar

soap.createClient(url, (err, client) => {
  if (err) {
    console.error('Error creando el cliente SOAP:', err);
    return;
  }

  client.FullCountryInfo({ sCountryISOCode: countryCode }, (err, result) => {
    if (err) {
      console.error('Error llamando al método FullCountryInfo:', err);
      return;
    }

    console.log('Resultado de FullCountryInfo:', result);
  });
});

