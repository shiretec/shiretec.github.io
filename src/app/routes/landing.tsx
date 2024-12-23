import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { paths } from '@/config/paths';

const LandingRoute = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(paths.shire.calc.getHref());
    // if (user.data) {
    //   navigate(paths.app.dashboard.getHref());
    // } else {
    //   navigate(paths.home.getHref());
    // }
  };

  return (
    <>
      <Head description="Welcome to shire" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Shiretec</span>
          </h2>
          <img src={logo} alt="react" />
          <p>
            <i>Shiretec</i> will help you to build your Real Estate portfolio.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button
                onClick={handleStart}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                }
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingRoute;
