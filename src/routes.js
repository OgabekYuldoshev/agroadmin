// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/users";
import Category from "layouts/category";
import Products from "layouts/product";
import Partners from "layouts/partners";
import Pages from "layouts/pages";
import Sliders from "layouts/slider";
import Message from "layouts/message";
import Address from "layouts/address";
import Order from "layouts/order";
import Photos from "layouts/media/photos";
import Single from "layouts/media/photos/operations/Edit";
import NewPage from "layouts/pages/NewPages";
import EditPage from "layouts/pages/Edit";
import NewProduct from "layouts/product/NewProducs";
import EditProduct from "layouts/product/Edit";
import SubCategory from "layouts/category/sub_category";
import SubSubCategory from "layouts/category/sub_sub_category";


// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Kategoryalar",
    key: "category",
    icon: <Icon fontSize="small">category</Icon>,
    route: "/category",
    component: <Category />,
  },
  {
    name: "SubCategory",
    key: "subcategory",
    route: "/category/:id",
    meta: {
      navLink: "/category",
    },
    component: <SubCategory />,
  },
  {
    name: "SubSubCategory",
    key: "subsubcategory",
    route: "/category/:id/:sub_id",
    meta: {
      navLink: "/category",
    },
    component: <SubSubCategory />,
  },
  {
    type: "collapse",
    name: "Hamkorlar",
    key: "partners",
    icon: <Icon fontSize="small">supervised_user_circle</Icon>,
    route: "/partners",
    component: <Partners />,
  },
  {
    type: "collapse",
    name: "Mahsulotlar",
    key: "products",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/products",
    component: <Products />,
  },
  {
    name: "Yangi mahsulot yaratish",
    key: "new-product",
    route: "/products/new",
    meta: {
      navLink: "/category",
    },
    component: <NewProduct />,
  },
  {
    name: "Mahsulotni o'zgartirish",
    key: "edit-product",
    route: "/products/edit/:id",
    meta: {
      navLink: "/category",
    },
    component: <EditProduct />,
  },
  {
    name: "Mahsulotni o'zgartirish",
    key: "edit-pages",
    route: "/pages/edit/:id",
    meta: {
      navLink: "/pages",
    },
    component: <EditPage />,
  },
  {
    type: "collapse",
    name: "Buyurtmalar",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/orders",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Sahifalar",
    key: "pages",
    icon: <Icon fontSize="small">auto_stories</Icon>,
    route: "/pages",
    component: <Pages />,
  },
  {
    name: "Yangi Sahifa yaratish",
    key: "new-pages",
    route: "/pages/new",
    meta: {
      navLink: "/pages",
    },
    component: <NewPage />,
  },
  {
    type: "collapse",
    name: "Sliderlar",
    key: "slider",
    route: "/sliders",
    icon: <Icon fontSize="small">slideshow</Icon>,
    component: <Sliders />,
  },
  {
    type: "collapse",
    name: "Manzillar",
    key: "addresses",
    icon: <Icon fontSize="small">add_location</Icon>,
    route: "/address",
    component: <Address />,
  },
  {
    type: "collapse",
    name: "Rasmlar",
    key: "photos",
    icon: <Icon fontSize="small">images</Icon>,
    route: "/photos",
    component: <Photos />,
  },
  {
    name: "media",
    key: "media",
    route: "/photos/:id",
    meta: {
      navLink: "/category",
    },
    component: <Single />,
  },
  {
    type: "collapse",
    name: "Foydalanuvchilar",
    key: "users",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/users",
    component: <Users />,
  },

  {
    name: "Message",
    key: "message",
    route: "/message",
    component: <Message />,
  },
];

export default routes;
