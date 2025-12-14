import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/auth/AdminRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ErrorBoundary from "./components/common/ErrorBoundary";
// Components
import Layout from "./components/common/Layout";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { useAuth } from "./context/AuthContext";
import AddSweet from "./pages/AddSweet";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import EditSweet from "./pages/EditSweet";
// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PurchaseHistory from "./pages/PurchaseHistory";
import Register from "./pages/Register";
import SweetDetail from "./pages/SweetDetail";
import SweetsList from "./pages/SweetsList";

function App() {
	const { isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	return (
		<ErrorBoundary>
			<Routes>
				{/* Public Routes */}
				<Route element={<Login />} path="/login" />
				<Route element={<Register />} path="/register" />

				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route element={<Navigate replace to="/dashboard" />} path="/" />
						<Route element={<Dashboard />} path="/dashboard" />
						<Route element={<SweetsList />} path="/sweets" />
						<Route element={<SweetDetail />} path="/sweets/:id" />
						<Route element={<PurchaseHistory />} path="/history" />

						{/* Admin Routes */}
						<Route element={<AdminRoute />}>
							<Route element={<AdminDashboard />} path="/admin" />
							<Route element={<AddSweet />} path="/admin/sweets/new" />
							<Route element={<EditSweet />} path="/admin/sweets/:id/edit" />
						</Route>
					</Route>
				</Route>

				{/* 404 */}
				<Route element={<NotFound />} path="*" />
			</Routes>
		</ErrorBoundary>
	);
}

export default App;
