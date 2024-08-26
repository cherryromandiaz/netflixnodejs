const { exec } = require('child_process');
const path = require('path');

const getRecommendations = (userId) => {
  return new Promise((resolve, reject) => {
    exec(`python3 ${path.join(__dirname, '../scripts/recommendation.py')} ${userId}`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(JSON.parse(stdout));
      }
    });
  });
};

module.exports = { getRecommendations };
