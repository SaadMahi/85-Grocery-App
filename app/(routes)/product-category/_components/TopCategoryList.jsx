import Image from "next/image";
import Link from "next/link";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  return (
    <section>
      <div className="mx-7 mt-2 flex justify-center gap-5 overflow-auto md:mx-20">
        {categoryList.map((category, index) => (
          <Link
            href={"/product-category/" + category?.attributes?.name}
            key={index}
            className={`group flex w-[full] min-w-[100px] cursor-pointer flex-col items-center gap-2 rounded-lg p-3 hover:bg-green-100 ${selectedCategory == category.attributes.name ? "bg-green-600 text-white" : "bg-green-50 text-green-800"}`}
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
            <h2>{categoryList[index]?.attributes?.name}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopCategoryList;
