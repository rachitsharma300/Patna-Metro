import { Link } from 'react-router-dom';
import { FaTrain, FaRoute, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';
import Button from '../components/common/Button';

const Home = () => {
  const features = [
    {
      icon: <FaRoute className="text-3xl mb-3 text-blue-600" />,
      title: "Plan Your Journey",
      description: "Find the best route between stations",
      link: "/route"
    },
    {
      icon: <FaMoneyBillWave className="text-3xl mb-3 text-green-600" />,
      title: "Fare Calculator",
      description: "Check ticket prices before you travel",
      link: "/fares"
    },
    {
      icon: <FaMapMarkedAlt className="text-3xl mb-3 text-purple-600" />,
      title: "Station Map",
      description: "View all stations on an interactive map",
      link: "/stations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaTrain className="text-5xl text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Welcome to Patna Metro
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your smart companion for navigating Patna's metro system with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.link}>
                  <Button variant="outline" size="small">
                    Explore
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Updates</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium text-blue-600">New Station Opening</h3>
              <p className="text-gray-600">Patna Junction station now operational</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium text-blue-600">Extended Hours</h3>
              <p className="text-gray-600">Metro services now available until 11 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;