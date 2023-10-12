import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/de';

import AppRoutes from '@/appRoutes';
import { Navbar } from '@/components';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="de">
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </LocalizationProvider>
    </QueryClientProvider>
  )
}

export default App
