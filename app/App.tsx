import {useFonts} from 'expo-font'; // Esse pacote é para poder instalar outras fontes no react-native
import { Main } from './src/Main';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'expo-status-bar';



export default function App() {
  // Basicamente, quando atribuir um font-family em algum componente, o nome passado para a font dele são esses antes dos 2 pontos
  // e a fonte que será carregada vai ser a que está indicada no require de cada um.
  const [isFontLoaded] = useFonts({
    'GeneralSans-400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!isFontLoaded){
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Main />
    </>
  );
}
