import { SafeAreaView } from 'react-native';
import { Login } from './assets/screens/Login';
import { globalTheme } from './assets/theme/globalTheme';

export default function App() {
  return (
    <SafeAreaView style={globalTheme.container}>
      <Login />
    </SafeAreaView>
  );
}
