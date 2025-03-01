import { Request,Response} from "express";
import Product from "../models/Products.model";


export const getProducts = async ( req: Request, res : Response )=>{
    try{
        const product = await Product.findAll({
            order: [
                ["id", "DESC"]
            ],
            /* attributes : { exclude : ["createdAt" , "updatedAt", "availability"]} */
        });
        res.json({data : product});
    }catch(error){
        console.log(error);
    }
}
export const getProductsById = async ( req: Request, res : Response )=>{
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                error : "producto no encontrado"
            });
        }
        res.json({ data : product });
    }catch(error){
        console.log(error);
    }
}
export const createProduct = async ( req: Request, res: Response ) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json({data : product})
    }catch(error){
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response)=> {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                error : "producto no encontrado"
            });
        }
        //Actualizar
        await product.update(req.body);
        await product.save();
        res.json({ data : product });
    }catch(error){
        console.log("Error");
    }
}

export const updateAvailability = async (req: Request, res: Response)=> {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                error : "producto no encontrado"
            });
        }
        //Actualizar
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data : product });
    }catch(error){
        console.log("Error");
    }
}

export const deleteProduct = async (req: Request, res: Response)=> {
    try{
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(!product){
            return res.status(404).json({
                error : "producto no encontrado"
            });
        }
        await product.destroy();
        res.json({ data: "Producto Eliminado"});
    }catch(error){
        console.log("Error");
    }
}