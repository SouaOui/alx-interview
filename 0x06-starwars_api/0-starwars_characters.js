#!/usr/bin/node
const https = require('https');

function fetchUrl (url, callback) {
  https.get(url, (res) => {
    let data = '';
    const { statusCode, headers } = res;

    if (statusCode === 301 || statusCode === 302) {
      const newUrl = headers.location;
      fetchUrl(newUrl, callback);
      return;
    }

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (statusCode !== 200) {
        callback(new Error(`Failed to fetch data: ${statusCode}`), null);
        return;
      }
      callback(null, data);
    });
  }).on('error', (error) => {
    callback(error, null);
  });
}

function getAndPrintCharacterNames (filmId) {
  const url = `https://swapi-api.alx-tools.com/api/films/${filmId}`;

  fetchUrl(url, (error, data) => {
    if (error) {
      console.error(`Error fetching film data: ${error.message}`);
      return;
    }

    try {
      const filmData = JSON.parse(data);
      const characterUrls = filmData.characters;
      const characterPromises = characterUrls.map((characterUrl) => {
        return new Promise((resolve, reject) => {
          fetchUrl(characterUrl, (error, data) => {
            if (error) {
              reject(error);
            } else {
              try {
                const character = JSON.parse(data);
                resolve(character.name);
              } catch (error) {
                reject(new Error('Error parsing character data'));
              }
            }
          });
        });
      });

      Promise.all(characterPromises)
        .then((names) => {
          names.forEach(name => console.log(name));
        })
        .catch((error) => {
          console.error(`Error fetching character names: ${error.message}`);
        });
    } catch (error) {
      console.error('Error parsing film data:', error.message);
    }
  });
}

if (process.argv.length !== 3) {
  console.log('Usage: node script.js <film_id>');
  process.exit(1);
}

const filmId = parseInt(process.argv[2], 10);
getAndPrintCharacterNames(filmId);
