import React from 'react';
import Header from '../components/Header';
import SpecialityMenu from '../components/SpecialityMenu';
import TopDoctors from '../components/TopDoctors';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <div className="overflow-x-hidden">

      {/* Hero Section */}
      <section className="mt-4 sm:mt-6">
        <Header />
      </section>

      {/* Speciality Row */}
      <section className="mt-10 sm:mt-16">
        <SpecialityMenu />
      </section>

      {/* Top Doctors */}
      <section className="mt-10 sm:mt-16">
        <TopDoctors />
      </section>

      {/* Bottom Banner */}
      <section className="mt-10 sm:mt-20 mb-16">
        <Banner />
      </section>

    </div>
  );
};

export default Home;
