import TagManager from 'react-gtm-module';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        page: location.pathname,
      },
    });
  }, [location]);
};

export default usePageTracking;
