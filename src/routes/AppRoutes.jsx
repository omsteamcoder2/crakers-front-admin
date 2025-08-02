import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Layout
import AdminLayout from "../layouts/AdminLayouts";

// Admin Pages
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import AddGallery from "../components/AddGallery";
import ManageGallery from "../components/ManageGallery";
import EditGallery from "../components/EditGallery";

import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import AddGtmTag from "../components/AddGtmTag";
import ManageGtmTags from "../components/ManageGmtTag";
import EditGtmTag from "../components/EditGtmTag";
import EditProduct from "../components/EditProduct";
import ManageProducts from "../components/ManageProduct";
import AddProduct from "../components/AddProduct";
import CategoryManagement from "../components/CategoryManagement";
import PopupAdManagement from "../components/PopupAdManagement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public route as root login */}
      <Route path="/" element={<Login />} />

      {/* 🔐 Protected Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-product"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="addgallery"
          element={
            <ProtectedRoute>
              <AddGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-products"
          element={
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-gallery"
          element={
            <ProtectedRoute>
              <ManageGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-category"
          element={
            <ProtectedRoute>
              <CategoryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-popupad"
          element={
            <ProtectedRoute>
              <PopupAdManagement />
            </ProtectedRoute>
          }
        />
        <Route
  path="edit-product/:code"
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>
        <Route
          path="edit-gallery/:id"
          element={
            <ProtectedRoute>
              <EditGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="addgtmtag"
          element={
            <ProtectedRoute>
              <AddGtmTag />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-gmt"
          element={
            <ProtectedRoute>
              <ManageGtmTags />
            </ProtectedRoute>
          }
        />
        <Route
          path="editgtmtag/:id"
          element={
            <ProtectedRoute>
              <EditGtmTag />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
