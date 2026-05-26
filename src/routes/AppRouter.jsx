import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout/MainLayout';
import Spinner from '@/components/ui/Spinner/Spinner';

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const VirtualMallPage = lazy(() => import('@/pages/VirtualMallPage/VirtualMallPage'));
const CatalogPage = lazy(() => import('@/pages/CatalogPage/CatalogPage'));
const CartPage = lazy(() => import('@/pages/CartPage/CartPage'));
const AuthPage = lazy(() => import('@/pages/AuthPage/AuthPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      minHeight: '60vh',
    }}>
      <Spinner size="lg" />
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mall" element={<VirtualMallPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
