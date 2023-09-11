const fs = require('fs');

const readBinaryFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

const convertToJSON = (binaryData) => {
    const jsonArray = [];
    for (let i = 0; i < binaryData.length; i++) {
        jsonArray.push(binaryData[i]);
    }
    return jsonArray;
};

const filePath = 'font.bin';  // Замените на путь к вашему бинарному файлу

(async () => {
    try {
        const binaryData = await readBinaryFile(filePath);
        const jsonArray = convertToJSON(binaryData);
        console.log(JSON.stringify(jsonArray, null, 2));
    } catch (err) {
        console.error('Error:', err.message);
    }
})();