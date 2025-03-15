import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext'; // Import the useUser hook

export default function QuickFacts() {
  return (
    <section>
      <h1>Quick Facts</h1>
      <Link to={'/dashboard'}>
        <button>Home</button>
      </Link>
    </section>
  );
}
