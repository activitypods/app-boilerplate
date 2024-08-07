import { useEffect, useState } from 'react';
import { useNotify, useLocaleState, useTranslate, useLogin, useLogout, useGetIdentity, useRedirect } from 'react-admin';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  Typography
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import StorageIcon from '@mui/icons-material/Storage';

const PodProvider = ({ podProvider, onSelect }) => (
  <>
    <Divider />
    <ListItem>
      <ListItemButton onClick={onSelect}>
        <ListItemAvatar>
          <Avatar>
            <StorageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={(new URL(podProvider['apods:baseUrl'])).host} secondary={podProvider['apods:area']} />
      </ListItemButton>
    </ListItem>
  </>
);

const PodLoginPageView = ({ text, customPodProviders }) => {
  const notify = useNotify();
  const [searchParams] = useSearchParams();
  const [locale] = useLocaleState();
  const login = useLogin();
  const logout = useLogout();
  const translate = useTranslate();
  const redirect = useRedirect();
  const { data: identity, isLoading: isIdentityLoading } = useGetIdentity();
  const [podProviders, setPodProviders] = useState(customPodProviders || []);
  const isSignup = searchParams.has('signup');
  const redirectUrl = searchParams.get('redirect');

  useEffect(() => {
    (async () => {
      if (podProviders.length === 0) {
        const results = await fetch('https://activitypods.org/data/pod-providers', {
          headers: {
            Accept: 'application/ld+json'
          }
        });
        if (results.ok) {
          const json = await results.json();
          // Filter POD providers by available locales
          const podProviders = json['ldp:contains'].filter(provider =>
            Array.isArray(provider['apods:locales'])
              ? provider['apods:locales'].includes(locale)
              : provider['apods:locales'] === locale
          );
          setPodProviders(podProviders);
        } else {
          notify('auth.message.pod_providers_not_loaded', 'error');
        }
      }
    })();
  }, [podProviders, setPodProviders, notify, locale]);

  useEffect(() => {
    if (searchParams.has('iss')) {
      // Automatically login if Pod provider is known
      login({ issuer: searchParams.get('iss') });
    } else if (searchParams.has('logout')) {
      logout(redirectUrl);
    } else if (!isIdentityLoading && identity?.id) {
      redirect('/');
    }
  }, [searchParams, login, logout, identity, isIdentityLoading, redirect, redirectUrl]);

  if (isIdentityLoading) return null;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Card
        sx={{
          minWidth: 300,
          maxWidth: 350,
          marginTop: '6em'
        }}
      >
        <Box
          sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Avatar>
            <LockIcon />
          </Avatar>
        </Box>
        <Box pl={2} pr={2}>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              padding: '4px 8px 8px'
            }}
          >
            {text || translate('auth.message.choose_pod_provider')}
          </Typography>
        </Box>
        <Box m={2}>
          <List sx={{ paddingTop: 0, paddingBottom: 0 }}>
            {podProviders.map((podProvider, i) => (
              <PodProvider
                key={i}
                podProvider={podProvider}
                onSelect={() =>
                  login({
                    issuer: podProvider['apods:baseUrl'],
                    redirect: redirectUrl,
                    isSignup
                  })
                }
              />
            ))}
          </List>
        </Box>
      </Card>
    </Box>
  );
};

export default PodLoginPageView;
