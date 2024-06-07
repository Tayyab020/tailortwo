import React from 'react';
import { useSelector } from 'react-redux';
import TailorHome from './TailorHome';
import DefaultHome from './CustomerHome';

const Home = () => {
  const isTailor = useSelector(state => state.user.isTailor);

  return isTailor ? <TailorHome /> : <DefaultHome />;
};

export default Home;
