const fs = require('fs');
function reading_from_file(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return data;
    } catch (err) {
        console.log(err);
    }
}
function writing_on_file(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    reading_from_file,
    writing_on_file,
};
