import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { useAuth } from "../../../context/AuthContext";
import AdminRoute from "../AdminRoute";

// Mock the AuthContext
vi.mock("../../../context/AuthContext", async () => {
	const actual = await vi.importActual("../../../context/AuthContext");
	return {
		...actual,
		useAuth: vi.fn(),
	};
});

const mockUser = {
	id: "test-user-id",
	email: "test@example.com",
	role: "USER" as const,
};

const mockAdminUser = {
	id: "admin-user-id",
	email: "admin@example.com",
	role: "ADMIN" as const,
};

const defaultAuthContext = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
	isAdmin: false,
	login: vi.fn(),
	register: vi.fn(),
	logout: vi.fn(),
};

function renderAdminRoute(authOverrides = {}, initialRoute = "/admin") {
	const authValue = { ...defaultAuthContext, ...authOverrides };
	(useAuth as Mock).mockReturnValue(authValue);

	return render(
		<MemoryRouter initialEntries={[initialRoute]}>
			<Routes>
				<Route element={<div data-testid="login-page">Login Page</div>} path="/login" />
				<Route element={<div data-testid="dashboard">Dashboard</div>} path="/dashboard" />
				<Route element={<AdminRoute />}>
					<Route element={<div data-testid="admin-content">Admin Content</div>} path="/admin" />
					<Route element={<div data-testid="admin-users">Admin Users</div>} path="/admin/users" />
				</Route>
			</Routes>
		</MemoryRouter>
	);
}

describe("AdminRoute Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("Admin Authentication Check", () => {
		it("renders children when user is admin", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockAdminUser,
				isAdmin: true,
			});

			expect(screen.getByTestId("admin-content")).toBeInTheDocument();
			expect(screen.queryByTestId("dashboard")).not.toBeInTheDocument();
		});

		it("redirects when user is not admin", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockUser,
				isAdmin: false,
			});

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
			expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
		});

		it("redirects when user is not authenticated", () => {
			renderAdminRoute({
				isAuthenticated: false,
				user: null,
				isAdmin: false,
			});

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
			expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
		});
	});

	describe("Redirect Behavior", () => {
		it("redirects non-admin authenticated users to dashboard", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockUser,
				isAdmin: false,
			});

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
		});

		it("redirects unauthenticated users to dashboard", () => {
			renderAdminRoute({
				isAuthenticated: false,
				user: null,
				isAdmin: false,
			});

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
		});

		it("redirects from nested admin routes when not admin", () => {
			renderAdminRoute(
				{
					isAuthenticated: true,
					user: mockUser,
					isAdmin: false,
				},
				"/admin/users"
			);

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
			expect(screen.queryByTestId("admin-users")).not.toBeInTheDocument();
		});
	});

	describe("Admin Access", () => {
		it("allows admin users to access admin routes", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockAdminUser,
				isAdmin: true,
			});

			expect(screen.getByTestId("admin-content")).toBeInTheDocument();
		});

		it("allows admin users to access nested admin routes", () => {
			renderAdminRoute(
				{
					isAuthenticated: true,
					user: mockAdminUser,
					isAdmin: true,
				},
				"/admin/users"
			);

			expect(screen.getByTestId("admin-users")).toBeInTheDocument();
		});
	});

	describe("Edge Cases", () => {
		it("redirects when isAdmin is false but user role is ADMIN", () => {
			// Edge case: user has ADMIN role but isAdmin context value is false
			// This tests the component's reliance on isAdmin from context
			renderAdminRoute({
				isAuthenticated: true,
				user: mockAdminUser,
				isAdmin: false, // Context says not admin
			});

			expect(screen.getByTestId("dashboard")).toBeInTheDocument();
			expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
		});

		it("grants access when isAdmin is true", () => {
			// The component only checks isAdmin from context
			renderAdminRoute({
				isAuthenticated: true,
				user: mockUser, // Regular user
				isAdmin: true, // But context says admin
			});

			expect(screen.getByTestId("admin-content")).toBeInTheDocument();
		});
	});

	describe("Outlet Rendering", () => {
		it("renders Outlet component for child routes when admin", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockAdminUser,
				isAdmin: true,
			});

			// The Outlet should render the child route content
			expect(screen.getByTestId("admin-content")).toBeInTheDocument();
		});

		it("does not render Outlet when not admin", () => {
			renderAdminRoute({
				isAuthenticated: true,
				user: mockUser,
				isAdmin: false,
			});

			// Should redirect, not render admin content
			expect(screen.queryByTestId("admin-content")).not.toBeInTheDocument();
		});
	});

	describe("Combined with ProtectedRoute", () => {
		it("admin route works independently of protected route", () => {
			// AdminRoute only checks isAdmin, not isAuthenticated
			renderAdminRoute({
				isAuthenticated: true,
				user: mockAdminUser,
				isAdmin: true,
			});

			expect(screen.getByTestId("admin-content")).toBeInTheDocument();
		});
	});
});
