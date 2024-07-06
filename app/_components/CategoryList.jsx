import Image from "next/image";
import Link from "next/link";

const CategoryList = ({ categoryList }) => {
  return (
    <section className="mt-5">
      <h2 className="text-xl font-bold text-primary">Shop by Category</h2>
      <div className="mt-2 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {categoryList.map((category, index) => (
          <Link
            href={"/product-category/" + category?.attributes?.name}
            key={index}
            className="group flex cursor-pointer flex-col items-center gap-2 rounded-lg bg-green-50 p-3 hover:bg-green-100"
          >
            <Image
              className="transition-all ease-in-out group-hover:scale-125"
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                category?.attributes?.icon?.data[0]?.attributes.formats?.small
                  ?.url
              }
              alt={`${categoryList[index]?.attributes?.name} icon`}
              width={50}
              height={50}
            />
            <h2 className="text-green-800">
              {categoryList[index]?.attributes?.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
