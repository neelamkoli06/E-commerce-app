import Link from "next/link";
import {
  FaLaptop,
  FaTshirt,
  FaMotorcycle,
  FaMobileAlt,
  FaCar,
} from "react-icons/fa";
import { GiSunglasses } from "react-icons/gi";
import { IoBrush } from "react-icons/io5";
import { TbPerfume } from "react-icons/tb";
import { MdChair } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { TbHomeSpark } from "react-icons/tb";
import { FaKitchenSet } from "react-icons/fa6";
import { PiShirtFoldedBold } from "react-icons/pi";
import { GiSonicShoes } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { BiMobileAlt } from "react-icons/bi";
import { TbSpray } from "react-icons/tb";
import { IoIosFootball } from "react-icons/io";
import { FaTabletScreenButton } from "react-icons/fa6";
import { PiBagFill } from "react-icons/pi";
import { GiLargeDress } from "react-icons/gi";
import { GiDiamondRing } from "react-icons/gi";
import { GiBallerinaShoes } from "react-icons/gi";
import { FiWatch } from "react-icons/fi";
import { FaCircleNotch } from "react-icons/fa6";
import { GiDress } from "react-icons/gi";

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case "beauty":
      return <IoBrush className="text-4xl text-white" />;
    case "fragrances":
      return <TbPerfume className="text-4xl text-white" />;
    case "furniture":
      return <MdChair className="text-4xl text-white" />;
    case "groceries":
      return <IoFastFoodSharp className="text-4xl text-white" />;
    case "home-decoration":
      return <TbHomeSpark className="text-4xl text-white" />;
    case "kitchen-accessories":
      return <FaKitchenSet className="text-4xl text-white" />;
    case "laptops":
      return <FaLaptop className="text-4xl text-white" />;
    case "mens-shirts":
      return <PiShirtFoldedBold className="text-4xl text-white" />;
    case "mens-shoes":
      return <GiSonicShoes className="text-4xl text-white" />;
    case "mens-watches":
      return <BsSmartwatch className="text-4xl text-white" />;
    case "mobile-accessories":
      return <BiMobileAlt className="text-4xl text-white" />;
    case "motorcycle":
      return <FaMotorcycle className="text-4xl text-white" />;
    case "skin-care":
      return <TbSpray className="text-4xl text-white" />;
    case "smartphones":
      return <FaMobileAlt className="text-4xl text-white" />;
    case "sports-accessories":
      return <IoIosFootball className="text-4xl text-white" />;
    case "sunglasses":
      return <GiSunglasses className="text-4xl text-white" />;
    case "tablets":
      return <FaTabletScreenButton className="text-4xl text-white" />;
    case "tops":
      return <GiDress className="text-4xl text-white" />;
    case "vehicle":
      return <FaCar className="text-4xl text-white" />;
    case "womens-bags":
      return <PiBagFill className="text-4xl text-white" />;
    case "womens-dresses":
      return <GiLargeDress className="text-4xl text-white" />;
    case "womens-jewellery":
      return <GiDiamondRing className="text-4xl text-white" />;
    case "womens-shoes":
      return <GiBallerinaShoes className="text-4xl text-white" />;
    case "womens-watches":
      return <FiWatch className="text-4xl text-white" />;
    default:
      return <FaCircleNotch className="text-4xl text-white" />;
  }
};

export default function CategoryCard({ category }) {
    return (
      <div className=" text-grey rounded-lg shadow-lg p-4 group relative hover:scale-105 transition-transform duration-300 " data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-4 bg-grey rounded-full">
            {getCategoryIcon(category)} {/* Use the getCategoryIcon function */}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <Link href={`/category/${category}`}>
              <span className="text-grey  hover:text-yellow-600 transition cursor-pointer hover:underline">
                View Products
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }