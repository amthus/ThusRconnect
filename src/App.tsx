
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Layouts
import DriverLayout from "./components/layout/DriverLayout";
import TechnicianLayout from "./components/layout/TechnicianLayout";
import AdminLayout from "./components/layout/AdminLayout";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// Driver Pages
import DriverHome from "./pages/Driver/DriverHome";
import DriverSOS from "./pages/Driver/DriverSOS";
import DriverMap from "./pages/Driver/DriverMap";
import DriverProfile from "./pages/Driver/DriverProfile";
import DriverServices from "./pages/Driver/DriverServices";
import DriverHistory from "./pages/Driver/DriverHistory";
import DriverServiceDetail from "./pages/Driver/DriverServiceDetail";
import DriverBreakdowns from "./pages/Driver/DriverBreakdowns";
import DriverQuote from "./pages/Driver/DriverQuote";
import DriverPayment from "./pages/Driver/DriverPayment";
import DriverInvoice from "./pages/Driver/DriverInvoice";

// Technician Pages
import TechnicianHome from "./pages/Technician/TechnicianHome";
import TechnicianServices from "./pages/Technician/TechnicianServices";
import TechnicianRequestDetail from "./pages/Technician/TechnicianRequestDetail";
import TechnicianClients from "./pages/Technician/TechnicianClients";
import TechnicianProfile from "./pages/Technician/TechnicianProfile";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminTechnicians from "./pages/Admin/AdminTechnicians";
import AdminRequests from "./pages/Admin/AdminRequests";
import AdminZones from "./pages/Admin/AdminZones";
import AdminStats from "./pages/Admin/AdminStats";
import AdminSettings from "./pages/Admin/AdminSettings";

// Common Pages
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  requiredUserType 
}: { 
  children: React.ReactNode;
  requiredUserType: 'driver' | 'technician' | 'admin' | null;
}) => {
  const { isAuthenticated, userType, isLoading } = useAuth();

  // While checking authentication status, show nothing
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-benin-blue"></div>
    </div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If requiredUserType doesn't match the userType, redirect to their home
  if (requiredUserType && userType !== requiredUserType) {
    if (userType === 'driver') {
      return <Navigate to="/driver" replace />;
    } else if (userType === 'technician') {
      return <Navigate to="/technician" replace />;
    } else if (userType === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Driver Routes */}
            <Route path="/driver" element={
              <ProtectedRoute requiredUserType="driver">
                <DriverLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DriverHome />} />
              <Route path="sos" element={<DriverSOS />} />
              <Route path="map" element={<DriverMap />} />
              <Route path="services" element={<DriverServices />} />
              <Route path="service/:id" element={<DriverServiceDetail />} />
              <Route path="request/:id" element={<DriverServiceDetail />} />
              <Route path="history" element={<DriverHistory />} />
              <Route path="profile" element={<DriverProfile />} />
              {/* New routes for breakdowns, quotes, payments and invoices */}
              <Route path="breakdowns" element={<DriverBreakdowns />} />
              <Route path="quote/:id" element={<DriverQuote />} />
              <Route path="payment/:id" element={<DriverPayment />} />
              <Route path="invoice/:id" element={<DriverInvoice />} />
            </Route>

            {/* Technician Routes */}
            <Route path="/technician" element={
              <ProtectedRoute requiredUserType="technician">
                <TechnicianLayout />
              </ProtectedRoute>
            }>
              <Route index element={<TechnicianHome />} />
              <Route path="services" element={<TechnicianServices />} />
              <Route path="requests" element={<TechnicianHome />} />
              <Route path="request/:id" element={<TechnicianRequestDetail />} />
              <Route path="clients" element={<TechnicianClients />} />
              <Route path="client/:id" element={<div>Client Detail Page</div>} />
              <Route path="profile" element={<TechnicianProfile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredUserType="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="technicians" element={<AdminTechnicians />} />
              <Route path="requests" element={<AdminRequests />} />
              <Route path="zones" element={<AdminZones />} />
              <Route path="stats" element={<AdminStats />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
