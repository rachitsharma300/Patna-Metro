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
import NavbarTest from './pages/NavbarTest';
import Footer from './components/ui/Footer';
// import Routes from './pages/Routes';
import RoutePlanner from './pages/RoutePlanner';
// import MetroMap from './components/metro/MetroMap';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarTest />
      <main className="flex-grow">
        {/* Your main content will go here later */}
        {/* <Routes /> */}
        <RoutePlanner />
        {/* <MetroMap /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;