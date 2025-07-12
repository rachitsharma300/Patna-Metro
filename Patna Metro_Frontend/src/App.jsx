// // src/App.jsx
// import NavbarTest from './pages/NavbarTest';
// import Footer from './components/ui/Footer';

// function App() {
//   return (
//     <>
//       <NavbarTest />
//       <Footer />
//     </>
//   );
// }

// export default App;




// src/App.jsx
import Footer from './components/layout/Footer';

import RoutePlanner from './pages/RoutePlanner';
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarTest />
      <main className="flex-grow">
        <RoutePlanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;