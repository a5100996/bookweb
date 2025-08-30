import React from 'react';
import Hero from '../components/Hero';
import FeaturedRooms from '../components/FeaturedRooms';
import HighlightSection from '../components/HighlightSection';
import TimelineSection from '../components/TimelineSection';
import TestimonialSection from '../components/TestimonialSection';
import BlogSection from '../components/BlogSection';
import InstagramGrid from '../components/InstagramGrid';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedRooms />
      <HighlightSection />
      <TimelineSection />
      <TestimonialSection />
      
      <InstagramGrid />
    </main>
  );
};

export default HomePage;