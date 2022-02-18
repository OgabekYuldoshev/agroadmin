// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Users from "layouts/users";
import Category from "layouts/category";
import Products from "layouts/product";
import NewProduct from "layouts/product/NewProducs";
import EditProduct from "layouts/product/Edit";
import SubCategory from "layouts/category/sub_category";

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
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
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
];

export default routes;
