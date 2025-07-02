import Home from "./pages/Home";
import { Layout } from "./layout/Layout";
import Product from "./pages/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Complain from "./pages/Complain";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./admin_panel/pages/Dashboard";
import LayoutAdmin from "./admin_panel/layout/LayoutAdmin";
import { ToastContainer } from "react-toastify";
import CategoryList from "./admin_panel/pages/Category/CategoryList";
import AddCategory from "./admin_panel/pages/Category/AddCategory";
import EditCategory from "./admin_panel/pages/Category/EditCategory";
import AddColors from "./admin_panel/pages/Color/AddColors";
import ColorList from "./admin_panel/pages/Color/ColorList";
import EditColor from "./admin_panel/pages/Color/EditColor";
import AddProduct from "./admin_panel/pages/Product/AddProduct";
import ProductList from "./admin_panel/pages/Product/ProductList";
import EditProduct from "./admin_panel/pages/Product/EditProduct";
import ComplainList from "./admin_panel/pages/Complain/ComplainList";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          element={
            <Layout>
              <Home />
            </Layout>
          }
          path="/"
        />
        <Route
          element={
            <Layout>
              <Product />
            </Layout>
          }
          path="/products"
        />
        <Route
          path="/complain"
          element={
            <Layout>
              <Complain />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/cartPage"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <AuthPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <ProfilePage />{" "}
            </Layout>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/addcategory"
          element={
            <LayoutAdmin>
              <AddCategory />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/CategoryList"
          element={
            <LayoutAdmin>
              <CategoryList />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/EditCategory"
          element={
            <LayoutAdmin>
              <EditCategory />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/addcolor"
          element={
            <LayoutAdmin>
              <AddColors />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/ColorList"
          element={
            <LayoutAdmin>
              <ColorList />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/EditColor"
          element={
            <LayoutAdmin>
              <EditColor />
            </LayoutAdmin>
          }
        />

        <Route
          path="/admin/addProduct"
          element={
            <LayoutAdmin>
              <AddProduct />
            </LayoutAdmin>
          }
        />

        <Route
          path="/admin/ProductList"
          element={
            <LayoutAdmin>
              <ProductList />
            </LayoutAdmin>
          }
        />

        <Route
          path="/admin/EditProduct/:id"
          element={
            <LayoutAdmin>
              <EditProduct />
            </LayoutAdmin>
          }
        />
        <Route
          path="/admin/ComplainList"
          element={
            <LayoutAdmin>
              <ComplainList />
            </LayoutAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
