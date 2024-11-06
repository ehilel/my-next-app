"use client";
import { useEffect, useState } from "react";
import http from '../services/http';
import { getCars } from '../services/car'
import axios from 'axios';
import ListCars from '../app/ListCars/page';

export default function Home() {
  return (
    <ListCars/>
  );
}
