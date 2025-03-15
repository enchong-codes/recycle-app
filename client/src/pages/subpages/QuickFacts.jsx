import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function QuickFacts() {
  // Define the facts
  const facts = [
    'Recycling one aluminum can saves enough energy to run a TV for three hours.',
    'Recycling a single glass bottle saves enough energy to power a light bulb for four hours.',
    'Recycling one ton of paper saves 17 trees and 7,000 gallons of water.',
    'It takes 500 years for plastic to decompose in a landfill.',
    'Recycling plastic saves twice as much energy as burning it in an incinerator.',
    'Aluminum can be recycled indefinitely without losing quality.',
    'Recycling one ton of steel saves 2,500 pounds of iron ore and 1,400 pounds of coal.',
    'Plastic bottles can take up to 450 years to break down in the environment.',
    'Producing new plastic uses up to 70% more energy than recycling old plastic.',
    'Recycling reduces greenhouse gas emissions and helps fight climate change.',
    'Only about 9% of plastic waste ever produced has been recycled.',
    'Every three months, Americans throw away enough aluminum to rebuild the entire U.S. commercial air fleet.',
    'Recycling one ton of cardboard saves over nine cubic yards of landfill space.',
    'A glass bottle can go from recycling bin to store shelf in as little as 30 days.',
    'Recycling one ton of newspapers saves about 4,000 kilowatts of energy, enough to power a home for six months.',
  ];

  const [randomFacts, setRandomFacts] = useState([]);

  // Function to get 3 unique random facts
  const getRandomFacts = () => {
    const shuffledFacts = [...facts].sort(() => Math.random() - 0.5); // Shuffle the facts array
    const selectedFacts = shuffledFacts.slice(0, 3); // Get the first 3 facts
    setRandomFacts(selectedFacts); // Set the random facts in state
  };

  // Use effect to get new facts when the component is rendered
  useEffect(() => {
    getRandomFacts();
  }, []); // This empty dependency array ensures it runs once when the component is mounted

  return (
    <section>
      <h2>Quick Facts about Recycling</h2>
      <ul>
        {randomFacts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>
    </section>
  );
}
