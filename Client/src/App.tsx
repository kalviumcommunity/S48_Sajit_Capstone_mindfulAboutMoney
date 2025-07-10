import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { Landing } from "./pages/landing-page";
import Contact from "./pages/contact";
import AboutDeveloper from "./pages/about-developer";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import ErrorBoundary from "./components/ErrorBoundary";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import {
  HomeIcon,
  ContactIcon,
  UserIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import HealthPage from "./pages/health";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return isSignedIn ? (
    <FinancialRecordsProvider>{children}</FinancialRecordsProvider>
  ) : (
    <Navigate to='/auth' replace />
  );
}

function AppContent() {
  const location = useLocation();
  const { isSignedIn } = useUser();

  // Automatically redirect to dashboard if signed in and on root or auth page
  if (
    isSignedIn &&
    (location.pathname === "/" || location.pathname === "/auth")
  ) {
    return <Navigate to='/dashboard' replace />;
  }

  return (
    <div className='app-container'>
      <ErrorBoundary>
        {/* Enhanced Navbar */}
        <nav className='fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-50 via-white to-cyan-50 bg-opacity-90 shadow-lg py-4 px-8 z-50 flex items-center justify-between'>
          {/* Logo and Brand */}
          <div className='flex items-center space-x-4'>
            <img
              src='/logo.png'
              alt='Mindful Money Logo'
              className='h-10 w-10'
            />
            <Link
              to='/'
              className='text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 tracking-tight hover:opacity-80 transition-opacity'
            >
              Mindful About Money
            </Link>
          </div>

          {/* Navigation Links */}
          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-4 bg-emerald-50 rounded-full p-1'>
              <SignedOut>
                <Link
                  to='/'
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                    ${
                      location.pathname === "/"
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "hover:bg-emerald-100 text-gray-700"
                    }
                  `}
                >
                  <HomeIcon
                    className={`h-5 w-5 ${
                      location.pathname === "/" ? "text-white" : "text-gray-500"
                    }`}
                  />
                  <span className='text-sm font-medium'>Home</span>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  to='/dashboard'
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                    ${
                      location.pathname === "/dashboard"
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "hover:bg-emerald-100 text-gray-700"
                    }
                  `}
                >
                  <LayoutDashboardIcon
                    className={`h-5 w-5 ${
                      location.pathname === "/dashboard"
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  />
                  <span className='text-sm font-medium'>Dashboard</span>
                </Link>
              </SignedIn>

              <Link
                to='/contact'
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                  ${
                    location.pathname === "/contact"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "hover:bg-emerald-100 text-gray-700"
                  }
                `}
              >
                <ContactIcon
                  className={`h-5 w-5 ${
                    location.pathname === "/contact"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
                <span className='text-sm font-medium'>Contact</span>
              </Link>

              <Link
                to='/about-developer'
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                  ${
                    location.pathname === "/about-developer"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "hover:bg-emerald-100 text-gray-700"
                  }
                `}
              >
                <UserIcon
                  className={`h-5 w-5 ${
                    location.pathname === "/about-developer"
                      ? "text-white"
                      : "text-gray-500"
                  }`}
                />
                <span className='text-sm font-medium'>Developer</span>
              </Link>
            </div>

            {/* User Button */}
            <div className='bg-emerald-50 rounded-full p-1'>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-10 h-10 border-2 border-emerald-200 hover:border-emerald-400 transition-all",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </nav>

        {/* Offset for navbar */}
        <div className='pt-24'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/health' element={<HealthPage />} />
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path='/insights'
              element={
                <div className='text-center text-2xl text-gray-600 pt-16'>
                  Insights Page (Coming Soon)
                </div>
              }
            />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about-developer' element={<AboutDeveloper />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
