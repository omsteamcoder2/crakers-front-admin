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
import AddBlogs from "../components/AddBlogs";
import ManageProjects from "../components/ManageProjects";
import ManageGallery from "../components/ManageGallery";
import ManageBlogs from "../components/ManageBlogs";
import EditProject from "../components/EditProject";
import EditGallery from "../components/EditGallery";
import EditBlog from "../components/EditBlog";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/NotFound";
import EditService from "../components/EditService";
import AddService from "../components/AddService";
import ManageService from "../components/ManageService";

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
          path="addblogs"
          element={
            <ProtectedRoute>
              <AddBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="addServices"
          element={
            <ProtectedRoute>
              <AddService />
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
          path="manage-blogs"
          element={
            <ProtectedRoute>
              <ManageBlogs />
            </ProtectedRoute>
          }
        />
        <Route
        path="manage-services"
        element={
          <ProtectedRoute>
            <ManageService />
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
          path="edit-blog/:slug"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
        path="edit-service/:slug"
        element={
          <ProtectedRoute>
            <EditService/>
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
