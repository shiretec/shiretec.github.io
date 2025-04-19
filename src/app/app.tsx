import { RealEstateCalculationPage } from "@/pages/home";
import { Provider } from 'react-redux';
import { store } from './providers/store/store';

function App() {
  return (
    <Provider store={store}>
      <RealEstateCalculationPage />
    </Provider>
  );
}

export default App;
