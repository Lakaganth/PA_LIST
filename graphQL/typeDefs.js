const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date

  input newProductInputData {
    product_name: String!
    product_unit_price: Float
    product_pack: Int
    product_size: String
    product_inventory: Int
    product_inventory_date: Date
    category_name: String!
    primary_shop: String
    secondary_shop: String
  }
  type List {
    _id: ID!
    created_date: Date!
    completed: Boolean
    product: [Product]
  }

  type ProductFeed {
    product: [Product]
    cursors: String
  }

  type Shop {
    _id: ID!
    shop_name: String!
    shop_location: String!
  }

  type Category {
    _id: ID!
    category_name: String!
    product: [Product]
  }

  type Product {
    _id: ID!
    product_name: String!
    product_pack: Int
    product_size: String
    product_category: String!
    product_unit_price: Float
    product_inventory: Int
    product_inventory_date: Date
    product_completed: Boolean
    product_toBuy: Int
    product_toBuy_date: Date
    category: Category
    primary_shop: Shop
    secondary_shop: Shop
  }

  type Query {
    getAllCategories: [Category!]!
    getCategory(cID: ID!): Category!
    getAllShops: [Shop!]!
    getAllProducts: [Product!]!
    getProduct(pID: ID!): Product!
    getAllProductsForCategory(cID: ID!): [Product!]
    getAllProductsForCategory2(
      cID: ID!
      cursor: String
      first: Int!
    ): ProductFeed
    getTodayList: List!
  }
  type Mutation {
    addNewCategory(category_name: String!): Category!
    addNewShop(shop_name: String!, shop_location: String!): Shop!
    addNewProduct(newProductInput: newProductInputData!): Product!
    updateProductToBuy(pID: ID!, toBuy: Int!): Product!
    updateCompleted(pID: ID!, comp: Boolean!): Product!
    editProduct(pID: ID!, editProductInput: newProductInputData!): Product
    listCompleted(lID: ID!): Boolean!
    deleteAll: Boolean!
  }
`;
