import { Layout as RaLayout, AppBar as RaAppBar, useGetIdentity } from 'react-admin';
import { BackgroundChecks, UserMenu } from '@activitypods/react';

// Use ActivityPods UserMenu in the AppBar
const AppBar = () => <RaAppBar userMenu={<UserMenu />} />;

// Add a background check to ensure the application is correctly connected to the Pod provider
// If the app access needs change, this component will redirect the user to the Upgrade screen
const Layout = props => {
  const { data: identity, isLoading } = useGetIdentity();
  if (isLoading) return null;
  return (
    <BackgroundChecks
      clientId={import.meta.env.VITE_BACKEND_CLIENT_ID}
      listeningTo={[identity?.webIdData?.inbox, identity?.webIdData?.outbox]}
    >
      <RaLayout appBar={AppBar} {...props} />
    </BackgroundChecks>
  );
};

export default Layout;
