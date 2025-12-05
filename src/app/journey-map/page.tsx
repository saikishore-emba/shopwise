import React from 'react';
import JourneyMap from '@/components/JourneyMap';

export const metadata = {
  title: 'Journey Map',
  description: 'Customer journey map UI preview',
};

export default function Page() {
  return (
    <div>
      <JourneyMap />
    </div>
  );
}
