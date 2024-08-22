import { useCallback, useEffect, useState, useLayoutEffect } from "react";
import urlJoin from 'url-join';
import { useGetIdentity, useNotify } from "react-admin";
import { useNodeinfo } from '@semapps/activitypub-components';

const BackgroundChecks = ({ children }) => {
  const { data: identity, isLoading: isIdentityLoading } = useGetIdentity();
  const notify = useNotify();
  const [appStatus, setAppStatus] = useState({});
  const nodeinfo = useNodeinfo(identity?.id && new URL(identity?.id).host);

  const isLoggedOut = !isIdentityLoading && !identity?.id;

  const checkAppStatus = useCallback(async () => {
    // Only proceed if the tab is visible
    if (!document.hidden) {
      const oidcIssuer = new URL(identity?.id).origin;
      const endpointUrl = urlJoin(oidcIssuer, '.well-known/app-status');
      const token = localStorage.getItem('token');

      try {
        // Don't use dataProvider.fetch as it would go through the proxy
        const response = await fetch(endpointUrl, { headers: new Headers({ Authorization: `Bearer ${token}`, Accept: 'application/json' })});
        if (response.ok) {
          const appStatus = await response.json();
          if (appStatus) {
            setAppStatus(appStatus);
            if (!appStatus.onlineBackend) {
              notify(`The app backend is offline`, { type: 'error' });
            } else if (!appStatus.installed) {
              notify(`The app is not installed`, { type: 'error' });
            } else if (appStatus.upgradeNeeded) {
              const consentUrl = new URL(nodeinfo?.metadata?.consent_url);
              consentUrl.searchParams.append('client_id', import.meta.env.VITE_BACKEND_CLIENT_ID);
              consentUrl.searchParams.append('redirect', window.location.href);
              window.location.href = consentUrl;
            }
          }
        }
      } catch(e) {
        notify(`Unable to check app status`, { type: 'error' });
      }
    }
  }, [identity, nodeinfo, setAppStatus, document]);

  useEffect(() => {
    if (identity?.id && nodeinfo) {
      checkAppStatus();
      const timerId = setInterval(checkAppStatus, 120000);
      return () => clearInterval(timerId)
    }
  }, [identity, nodeinfo, checkAppStatus]);

  useLayoutEffect(() => {
    document.addEventListener("visibilitychange", checkAppStatus);
    return () => document.removeEventListener("visibilitychange", checkAppStatus);
  }, [checkAppStatus]);

  // TODO display error message instead of notifications
  if (isLoggedOut || (appStatus.onlineBackend === true && appStatus.installed === true && appStatus.upgradeNeeded === false)) {
    return children;
  } else {
    return null;
  }
};

export default BackgroundChecks;
