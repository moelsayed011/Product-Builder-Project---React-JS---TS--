// ** productObject === errorsObj(TITLE , DESCRIPTION , IMAGEURL , PRICE)

/**
 *
 * Validate product data and return any validation errors.
 * @param {Object} product - The product object to be validated.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imageURL - The URL of the product image.
 * @param {string} product.price - The price of the product.
 * 
 * @returns {Object} An object containing validation errors.
 * @property {string} errors.title - Validation error message for the title.
 * @property {string} errors.description - Validation error message for the description.
 * @property {string} errors.imageURL - Validation error message for the imageURL.
 * @property {string} errors.price - Validation error message for the price.
 */

export const productValidation = (product: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
}) => {
    const errors: {
        title: string;
        description: string;
        imageURL: string;
        price: string;
    } = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };

    const validationImageURL = /^(ftp|http|https):\/\/[^ "]+$/.test(
        product.imageURL
    );

    if (
        !product.title.trim() ||
        product.title.length < 10 ||
        product.title.length > 50
    ) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }

    if (
        !product.description.trim() ||
        product.description.length < 10 ||
        product.description.length > 900
    ) {
        errors.description =
            "Product description must be between 10 and 900 characters!";
    }

    if (!product.imageURL.trim() || !validationImageURL) {
        errors.imageURL = "Valid image URL is required";
    }

    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price is required!";
    }

    return errors;
};
