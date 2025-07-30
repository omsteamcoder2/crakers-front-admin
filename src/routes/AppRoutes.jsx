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
import AddProjects from "../components/AddProjects";
import AddGallery from "../components/AddGallery";
import ManageProjects from "../components/ManageProjects";
import ManageGallery from "../components/ManageGallery";
import EditProject from "../components/EditProject";
import EditGallery from "../components/EditGallery";

import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import AddGtmTag from "../components/AddGtmTag";
import ManageGtmTags from "../components/ManageGmtTag";
import EditGtmTag from "../components/EditGtmTag";

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
          path="addprojects"
          element={
            <ProtectedRoute>
              <AddProjects />
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
          path="manage-projects"
          element={
            <ProtectedRoute>
              <ManageProjects />
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
          path="edit-project/:slug"
          element={
            <ProtectedRoute>
              <EditProject />
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
