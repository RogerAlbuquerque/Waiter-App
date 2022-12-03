import { GlobalStyles } from './styles/GlobalStyles';

import { Header } from './components/Header/Index';
import { Orders } from './components/Orders';


export function App(){
  return(
    <>
      <GlobalStyles />
      <Header />
      <Orders />

    </>
  );
}
