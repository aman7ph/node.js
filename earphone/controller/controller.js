const product_module = require('../module/model');
const creating_updating_product = require('../utulity/creating_updating_product');

//@desc  for sendig data to the browser header
function sending(res, data) {
    res.writeHead(200, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify(data));
}

//@desc  for creating new product header
function writing(res, data) {
    res.writeHead(201, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify(data));
}

//@desc  for creating new product header
function deleted(res) {
    res.writeHead(201, { 'Content-Type': 'Application/json' });
    res.end(
        JSON.stringify({ message: 'product has been deleted sucessesfuly' })
    );
}

//@desc  for sending an error message header
function returning_errore_mess(res) {
    res.writeHead(404, { 'Content-Type': 'Application/json' });
    res.end(JSON.stringify({ message: 'The Product dose not exit' }));
}

//@desc for geting all the products
async function get_all_product(req, res) {
    try {
        const products_data = await product_module.find_all();
        sending(res, products_data);
    } catch (error) {
        console.log(error);
    }
}

//@desc for geting sepecific the product
async function get_product(req, res, id) {
    try {
        const product = await product_module.find_by_id(id);
        if (!product) {
            returning_errore_mess(res);
        } else {
            sending(res, product);
        }
    } catch (error) {
        console.log(error);
    }
}

//@desc for creating a new product
async function create_product(req, res) {
    try {
        const body = await creating_updating_product.creat_update(req);
        const newproduct = JSON.parse(body);
        const new_product = await product_module.creat_product(newproduct);

        writing(res, new_product);
    } catch (error) {
        console.log(error);
    }
}
//@desc for update a product
async function update_product(req, res, id) {
    try {
        const product = await product_module.find_by_id(id);
        if (!product) {
            returning_errore_mess(res);
        } else {
            const body = await creating_updating_product.creat_update(req);
            const { name, description, price } = JSON.parse(body);
            newproduct = {
                name: name || product.name,
                description: description || product.description,
                price: price || product.price,
            };
            const new_product = await product_module.update_product(
                id,
                newproduct
            );

            writing(res, new_product);
        }
    } catch (error) {
        console.log(error);
    }
}

//@desc for delet a product
async function delete_product(req, res, id) {
    try {
        const product = await product_module.find_by_id(id);
        if (!product) {
            returning_errore_mess(res);
        } else {
            await product_module.delet_product(id);
            deleted(res);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    get_all_product,
    get_product,
    create_product,
    update_product,
    delete_product,
};
