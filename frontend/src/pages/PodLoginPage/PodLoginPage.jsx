import { useMemo } from 'react';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import PodLoginPageView from './PodLoginPageView';

const PodLoginPage = props => {
  const muiTheme = useMemo(() => createTheme(props.theme), [props.theme]);
  return (
    <ThemeProvider theme={muiTheme}>
      <PodLoginPageView {...props} />
    </ThemeProvider>
);
};

export default PodLoginPage;
