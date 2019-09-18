const Product = require("../models/productModels");
const Category = require("../models/categoryModel");
const Shop = require("../models/shopModel");
const ToBuy = require("../models/toBuyModel");

const moment = require("moment");

module.exports = {
  Query: {
    getAllCategories: async () => {
      try {
        const category = await Category.find().sort({
          category_name: "asc"
        });

        return category;
      } catch (err) {
        throw new Error("Not available", err);
      }
    },
    getCategory: async (root, { cID }, ctxt) => {
      try {
        const category = await Category.findById(cID);
        return category;
      } catch (err) {
        throw new Error("Not available", err);
      }
    },
    getAllShops: async () => {
      try {
        const shop = await Shop.find().sort({
          shop_name: "asc"
        });

        return shop;
      } catch (err) {
        throw new Error("Not available", err);
      }
    },

    getAllProducts: async () => {
      try {
        const products = await Product.find();

        return products;
      } catch (err) {
        throw new Error("Not available", err);
      }
    },
    getAllProductsForCategory: async (root, { cID }, ctxt) => {
      const product = await Product.find({ category: cID })
        .sort({
          product_name: "asc"
        })
        .populate("shop")
        .populate("category");

      return product;
    },
    getAllProductsForCategory2: async (root, { cID, cursor, first }) => {
      try {
        // Get the List of product for the Category
        // const category = await Category.findById(cID);
        // const products = category.product.map(
        //   async p =>
        //     await Product.findById(p.toString())
        //       .populate("shop")
        //       .populate("category")
        // );
        const product = await Product.find({ category: cID });

        // const product = await products.map(p => p);
        // console.log(category.product);

        console.log("first", first);

        if (!cursor) {
          cursor = await product[product.length - 1]._id;
          // cursor = cursorObj._id.toString();
        }

        // Index to slice the array

        console.log("cursor", typeof cursor);
        const newProductIndex = product.findIndex(r => {
          return r._id.toString() === cursor.toString();
        });

        const newCursor = product[newProductIndex - first]._id;
        console.log("newCursor", newCursor);
        console.log("newProductIndex", newProductIndex);

        const productFeed = {
          product: product.slice(newProductIndex - first, newProductIndex),
          cursors: newCursor
        };
        // console.log(productFeed);
        return productFeed;

        // console.log(productFeed);
      } catch (err) {
        throw new Error("Not available", err);
      }
    },
    getTodayList: async (root, args, ctxt) => {
      const today = moment().format("YYYY MM DD");

      try {
        const list = await ToBuy.findOne({ created_date: today }).populate(
          "product"
        );

        return list;
      } catch (err) {
        throw new Error("Not available", err);
      }
    },
    getProduct: async (root, { pID }, ctxt) => {
      try {
        const product = await Product.findById(pID)
          .populate("shop")
          .populate("category");
        return product;
      } catch (err) {
        throw new Error("Not available", err);
      }
    }
  },
  Mutation: {
    addNewCategory: async (root, { category_name }, ctxt) => {
      try {
        const newCategory = new Category({
          category_name
        });
        await newCategory.save();
        return newCategory;
      } catch (err) {
        throw new Error("Error, Category not Created", err);
      }
    },
    addNewShop: async (root, { shop_name, shop_location }, ctxt) => {
      try {
        const newShop = new Shop({
          shop_name,
          shop_location
        });

        await newShop.save();
        return newShop;
      } catch (err) {
        throw new Error("Error, Shop not Created", err);
      }
    },
    addNewProduct: async (root, { newProductInput }, ctxt) => {
      const today = moment().format("YYYY MM DD");
      const {
        product_name,
        product_pack,
        product_size,
        product_unit_price,
        product_inventory,
        product_inventory_date,
        category_name,
        primary_shop,
        secondary_shop
      } = newProductInput;
      console.log(category_name);
      try {
        const newProduct = new Product({
          product_name,
          product_pack,
          product_size,
          product_unit_price,
          product_inventory,
          product_inventory_date,
          product_completed: false,
          product_toBuy_date: today,
          product_toBuy: 0
        });

        // Save to Category
        const category = await Category.findOne({ category_name });
        // console.log(newProduct._id);
        category.product.push(newProduct._id);
        await category.save();
        newProduct.category = category._id;
        newProduct.product_category = category.category_name;

        // Save to shop
        const prim_shop = await Shop.findOne({
          shop_name: primary_shop
        });
        prim_shop.product.push(newProduct._id);
        await prim_shop.save();
        newProduct.primary_shop = prim_shop._id;

        if (secondary_shop) {
          const sec_shop = await Shop.findOne({
            shop_name: secondary_shop
          });
          sec_shop.product.push(newProduct._id);
          await sec_shop.save();
          newProduct.secondary_shop = sec_shop._id;
        }

        await newProduct.save();
        return newProduct;
      } catch (err) {
        throw new Error("Error, Product not Created", err);
      }
    },
    updateProductToBuy: async (root, { pID, toBuy }, ctxt) => {
      const today = moment().format("YYYY MM DD");
      // const product = await Product.findByIdAndUpdate(
      //   { _id: pID },
      //   { $set: { product_toBuy: toBuy, product_toBuy_date: today } }
      // );
      const product = await Product.findById(pID);
      product.product_toBuy = toBuy;
      product.product_toBuy_date = today;
      // console.log(product)

      // console.log(product.product_toBuy_date);
      await product.save();
      const list = await ToBuy.findOne({
        created_date: product.product_toBuy_date
      });

      if (list) {
        const existingProd = list.product.filter(p => {
          return p._id.toString() === product._id.toString();
        });

        if (existingProd.length === 0) {
          list.product.push(product._id);
          await list.save();
        }
      } else {
        const newList = new ToBuy({
          created_date: product.product_toBuy_date
        });

        newList.product.push(product._id);
        await newList.save();
      }

      return product;
    },
    updateCompleted: async (root, { pID, comp }, context) => {
      try {
        const product = await Product.findByIdAndUpdate(
          { _id: pID },
          { $set: { product_completed: !comp } }
        );
        // console.log(product);
        return product;
      } catch (err) {
        throw new Error("Error, Product not Found", err);
      }
    },
    editProduct: async (root, { pID, editProductInput }, context) => {
      const {
        product_name,
        product_pack,
        product_size,
        product_unit_price,
        product_inventory,
        product_inventory_date
      } = editProductInput;

      try {
        const product = await Product.findByIdAndUpdate(
          { _id: pID },
          {
            $set: {
              product_name,
              product_pack,
              product_size,
              product_unit_price,
              product_inventory,
              product_inventory_date
            }
          }
        );

        return product;
      } catch (err) {
        throw new Error("Error, Product Edit failed", err);
      }
    },
    listCompleted: async (root, { lID }, ctxt) => {
      const todayList = await ToBuy.findById(lID);
      // console.log(todayList);
      todayList.product.map(async p => {
        await Product.findByIdAndUpdate(
          { _id: p },
          {
            $set: {
              product_completed: false,
              product_toBuy: 0
            }
          }
        );
      });
      todayList.product = [];
      todayList.save();
      return true;
    },
    deleteProduct: async (root, { pID, cID }, ctxt) => {
      try {
        const product = await Product.findById(pID);
        const category = await Category.findById(cID);
        category.product = category.product.filter(p => p.toString() !== pID);
        category.save();

        const pShop = product.primary_shop;

        const shop = await Shop.findById(pShop);

        shop.product = shop.product.filter(p => p.toString() !== pID);
        shop.save();

        if (product.secondary_shop) {
          const sec_shop = product.secondary_shop;
          console.log(sec_shop);
          const secshop = await Shop.findById(sec_shop);
          secshop.product = secshop.product.filter(p => p.toString() !== pID);
          secshop.save();
        }

        await Product.findByIdAndRemove(pID);

        return true;
      } catch (err) {
        throw new Error("Error, Product Delete failed", err);
      }
    },
    deleteAll: async () => {
      await Category.deleteMany();
      await Shop.deleteMany();
      await Product.deleteMany();

      return true;
    }
  }
};
