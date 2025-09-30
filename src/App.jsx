import InstallPrompt from './components/InstallPrompt'; // <-- add this
import LawMastersPrototype from './pages/LawMastersPrototype.jsx'; // add .jsx to be safe

export default function App() {
  return (
    <>
      {console.log('App rendering')}
      <InstallPrompt />
      <LawMastersPrototype />
    </>
  );
}
