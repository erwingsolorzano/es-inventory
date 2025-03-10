import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product.model';
import QRCode from 'qrcode';

// Create a product and generate its QR code
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { code, name, description, image, category } = req.body;
    
    // Generate the QR code using the product code
    const qrCode = await QRCode.toDataURL(code);

    const newProduct: IProduct = new Product({
      code,
      name,
      description,
      image,
      category,
      qrCode,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
