const product_data = require('../utulity/reading_writing_file'); //for writing and reading on and from the file
filename = './data/data.json';
//@desc function for reterving all data
function find_all() {
    return new Promise((resolve, reject) => {
        const all_prduct_data = JSON.parse(
            product_data.reading_from_file(filename)
        );
        console.log(typeof all_prduct_data);
        resolve(all_prduct_data);
    });
}
//@desc function for reterving specific data
function find_by_id(id) {
    return new Promise((resolve, reject) => {
        const specific_product = JSON.parse(
            product_data.reading_from_file(filename)
        ).find((p) => p.id === id);
        resolve(specific_product);
    });
}
//@desc function for creating new data
function creat_product(product) {
    return new Promise((resolve, reject) => {
        const data = JSON.parse(product_data.reading_from_file(filename));
        const element_id = data.length + 1;
        const new_product = { id: element_id.toString(), ...product };
        data.push(new_product);
        product_data.writing_on_file(filename, data);
        resolve(new_product);
    });
}
//@desc function for updating data
function update_product(id, product) {
    return new Promise((resolve, reject) => {
        const data = JSON.parse(product_data.reading_from_file(filename));
        const index = data.findIndex((p) => p.id == id);
        data[index] = { id, ...product };
        product_data.writing_on_file(filename, data);
        resolve(data[index]);
    });
}
//@desc function for removing  data
function delet_product(id, product) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(product_data.reading_from_file(filename));
        const product = data.filter((p) => p.id !== id);
        product_data.writing_on_file(filename, product);
        resolve();
    });
}
module.exports = {
    find_all,
    find_by_id,
    creat_product,
    update_product,
    delet_product,
};
