import productoModel from "../models/producto.model.js";

class productDBManager {

    async getAllProducts(params) {
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 10,
        }

        if (params.sort && (params.sort === 'asc' || params.sort === 'desc')) paginate.sort = { price: params.sort}

        const productos = await productoModel.paginate({}, paginate);

        productos.prevLink = productos.hasPrevPage?`http://localhost:5000/products?page=${productos.prevPage}` : null;
        productos.nextLink = productos.hasNextPage?`http://localhost:5000/products?page=${productos.nextPage}` : null;

        //Add limit
        if (productos.prevLink && paginate.limit !== 10) productos.prevLink += `&limit=${paginate.limit}`
        if (productos.nextLink && paginate.limit !== 10) productos.nextLink += `&limit=${paginate.limit}`

        //Add sort
        if (productos.prevLink && paginate.sort) productos.prevLink += `&sort=${params.sort}`
        if (productos.nextLink && paginate.sort) productos.nextLink += `&sort=${params.sort}`

        return productos;
    }

    async getProductByID(pid) {
        const product = await productoModel.findOne({_id: pid});
        console.log(product)

        if (!product) throw new Error(`el producto ${pid} no existe`);

        return product;
    }

    async createProduct(product) {
        const {title, description, code, price, stock, category} = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('error al crear el producto');
        }

        return await productoModel.create({title, description, code, price, stock, category});  
    }

    async updateProduct(pid, productUpdate) {
        return await productoModel.updateOne({_id: pid}, productUpdate);
    }

    async deleteProduct(pid) {
        const result = await productoModel.deleteOne({_id: pid});

        if (result.deletedCount === 0) throw new Error(`el producto ${pid} no existe`);

        return result;
    }
}

export { productDBManager };