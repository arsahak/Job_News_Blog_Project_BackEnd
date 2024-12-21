const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
      min: [0, "Regular price must be a positive number"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
      min: [0, "Discount price must be a positive number"],
      validate: {
        validator: function (value) {
          return value < this.regularPrice;
        },
        message: "Discount price must be less than the regular price",
      },
    },
    retailPrice: {
      type: Number,
      required: [true, "Retail price is required"],
      min: [0, "Retail price must be a positive number"],
    },

    laborCost: {
      type: Number,
      required: [true, "Labor cost is required"],
    },

    shippingCost: {
      type: Number,
      required: [true, "Labor cost is required"],
    },

    fabricAPrice: {
      type: Number,
      required: [true, " Fabric A price is required"],
    },

    fabricBPrice: {
      type: Number,
      required: [true, " Fabric B price is required"],
    },

    image: {
      type: String,
      required: [true, "Product image URL is required"],
      validate: {
        validator: function (value) {
          return /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp)$/i.test(value);
        },
        message: "Please enter a valid image URL",
      },
    },
    // gallery: {
    //   type: [String], // Array of image URLs
    //   validate: {
    //     validator: function (value) {
    //       return value.every((url) =>
    //         /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp)$/i.test(url)
    //       );
    //     },
    //     message: "Gallery must contain valid image URLs",
    //   },
    // },
    
    articleNumber: {
      type: String,
      required: [true, "Product article number is required"],
      trim: true,
    },

    size: {
      type: String,
      required: [true, "Product size is required"],
    },

    color: {
      type: String,
      required: [true, "Product color is required"],
    },

    category: {
      type: Schema.Types.ObjectId, // Reference to the Category model
      ref: "Category",
      required: [true, "Category is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity must be at least 0"],
    },

    sold: {
      type: Number,
      default: 0,
      min: [0, "Sold quantity cannot be negative"],
    },

    shipping: {
      type: Number,
      default: 0,
      min: [0, "Shipping cost cannot be negative"],
    },
    
  },
  { timestamps: true }
);

const Product = model("Products", productSchema);

module.exports = Product;
