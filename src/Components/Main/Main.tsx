import Home from '@/Components/Main/Home/Home';
import Services from './Services/Services';
import Doctors from './Doctors/Doctors';
import Reviews from './Review/Reviews';
import Header from '../Header/Header';
const Main = () => {
  return (
    <div className="m-auto max-w-[1250px] px-5 md:px-16">
      <Header />
      <Home />
      <Services />
      <Doctors />
      <Reviews />
    </div>
  );
};

export default Main;
