"use client";
import { useEffect, useState } from "react";
import http from '../services/http';
import { getCars } from '../services/service/car'
import axios from 'axios';

export default function Home() {
  interface Car {
    _id?: string;
    model: string;
    number: string;
    color: string;
  }

  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newCar, setNewCar] = useState<Car>({ model: '', number: '', color: '' });


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        setCars(response.data.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

 
  const addCar = async () => {
    try {
      const response = await axios.post('/api/cars', newCar);
      setCars([...cars, response.data.data]);
      setNewCar({ model: '', number: '', color: '' });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const deleteCar = async (id: string) => {
    try {
      await axios.delete('/api/cars', { data: { id } });
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const updateCar = async (id: string, updatedCar: Car) => {
    try {
      const response = await axios.put('/api/cars', { id, updateData: updatedCar });
      setCars(cars.map(car => (car._id === id ? { ...car, ...updatedCar } : car)));
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Cars List</h1>

      {/* Form to add a new car */}
      <div>
        <h2>Add New Car</h2>
        <input
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Number"
          value={newCar.number}
          onChange={(e) => setNewCar({ ...newCar, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Color"
          value={newCar.color}
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
        />
        <button onClick={addCar}>Add Car</button>
      </div>

      <ul>
        {cars.map((car, index) => (
          <li key={index}>
            <br />
            Model: {car.model}<br />
            Number: {car.number}<br />
            Color: {car.color}<br />
            <button onClick={() => deleteCar(car._id!)}>Delete</button>
            {/* <button onClick={() => {
              const updatedCar = { ...car, model: car.model + ' Updated' }; // Example update
              updateCar(car._id!, updatedCar);
            }}>Update</button> */}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
