import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument, deleteDocument } from '../../../services/mongo'

export async function GET(request: Request){
    const client = await connectDatabase();
    const cars = await getAllDocuments(client, 'cars');
    client.close();

    return NextResponse.json({
        data: cars
    });
}

export async function POST(request: Request) {
    const client = await connectDatabase();
    const newCar = await request.json();
    const car = await insertDocument(client, 'cars', newCar);
    client.close();
  
    return NextResponse.json({
        data: car
    });
  }

export async function DELETE(request: Request){
  const client = await connectDatabase();
  const { id } = await request.json();
  const car = await deleteDocument(client, 'cars', id);
  client.close();

  return NextResponse.json({
    data: car
});
}



