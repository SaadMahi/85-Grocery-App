import ProductItem from "./ProductItem";

const ProductList = ({ productList }) => {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-green-500">
        Our Popular Products
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {productList.map(
          (product, index) =>
            index < 8 && <ProductItem product={product} key={index} />,
        )}
      </div>
    </section>
  );
};

export default ProductList;
