import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  query {
    getAllCategories {
      _id
      category_name
    }
  }
`;

export const GET_CATEGORY = gql`
  query($cID: ID!) {
    getCategory(cID: $cID) {
      category_name
    }
  }
`;
export const GET_ALL_SHOPS = gql`
  query {
    getAllShops {
      _id
      shop_name
    }
  }
`;
export const GET_PRODUCTS_FROM_CATEGORIES = gql`
  query($cID: ID!) {
    getAllProductsForCategory(cID: $cID) {
      _id
      product_name
      product_pack
      product_size
      product_category
      product_unit_price
      product_inventory
      product_toBuy
      product_inventory_date
      product_toBuy_date
      category {
        _id
        category_name
      }
      primary_shop {
        _id
      }
    }
  }
`;

export const GET_PRODUCT_FEED = gql`
  query getAllProductsForCategory2($cID: ID!, $cursor: String, $first: Int!) {
    getAllProductsForCategory2(cID: $cID, cursor: $cursor, first: $first) {
      product {
        product_name
        _id
      }
      cursors
    }
  }
`;

export const GET_TODAY_LIST = gql`
  query {
    getTodayList {
      _id
      created_date
      completed
      product {
        _id
        product_name
        product_pack
        product_size
        product_category
        product_completed
        product_toBuy
        product_unit_price
        category {
          _id
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query($pID: ID!) {
    getProduct(pID: $pID) {
      _id
      product_name
      product_pack
      product_size
      product_category
      product_unit_price
      product_inventory
      product_inventory_date
      category {
        _id
        category_name
      }
      # primary_shop {
      #   shop_name
      #   _id
      # }
      # secondary_shop {
      #   _id
      #   shop_name
      # }
    }
  }
`;

// <-------------------Mutations------------------->

export const ADD_NEW_CATEGORY = gql`
  mutation addNewCategory($category_name: String!) {
    addNewCategory(category_name: $category_name) {
      _id
      category_name
    }
  }
`;

export const ADD_NEW_SHOP = gql`
  mutation addNewShop($shop_name: String!, $shop_location: String!) {
    addNewShop(shop_name: $shop_name, shop_location: $shop_location) {
      _id
      shop_name
      shop_location
    }
  }
`;

export const ADD_NEW_PRODUCT = gql`
  mutation(
    $product_name: String!
    $product_pack: Int
    $product_size: String
    $product_unit_price: Float
    $product_inventory: Int
    $product_inventory_date: Date
    $category_name: String!
    $primary_shop: String
    $secondary_shop: String
  ) {
    addNewProduct(
      newProductInput: {
        product_name: $product_name
        product_pack: $product_pack
        product_size: $product_size
        product_unit_price: $product_unit_price
        product_inventory: $product_inventory
        product_inventory_date: $product_inventory_date
        category_name: $category_name
        primary_shop: $primary_shop
        secondary_shop: $secondary_shop
      }
    ) {
      _id
      category {
        _id
      }
    }
  }
`;

export const UPDATE_TOBUY_LIST = gql`
  mutation($pID: ID!, $toBuy: Int!) {
    updateProductToBuy(pID: $pID, toBuy: $toBuy) {
      product_name
      product_toBuy
    }
  }
`;

export const UPDATE_PRODUCT_COMPLETED = gql`
  mutation($pID: ID!, $comp: Boolean!) {
    updateCompleted(pID: $pID, comp: $comp) {
      product_name
      product_completed
      product_category
      product_toBuy
      product_unit_price
      _id
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation(
    $pID: ID!
    $product_name: String!
    $product_unit_price: Float
    $product_inventory: Int
    $product_inventory_date: Date
    $category_name: String!
    $primary_shop: String
    $secondary_shop: String
  ) {
    editProduct(
      pID: $pID
      editProductInput: {
        product_name: $product_name
        product_unit_price: $product_unit_price
        product_inventory: $product_inventory
        product_inventory_date: $product_inventory_date
        category_name: $category_name
        primary_shop: $primary_shop
        secondary_shop: $secondary_shop
      }
    ) {
      _id
      product_name
      product_unit_price
      product_inventory
    }
  }
`;

export const LIST_COMPLETED = gql`
  mutation($lID: ID!) {
    listCompleted(lID: $lID)
  }
`;
