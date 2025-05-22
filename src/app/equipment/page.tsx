"use client";
import { EquipmentInfo } from '@/types/equipment';
import { useState, useEffect } from 'react';

export default function Equipment() {
  const page = 1;
  const take = 30;
  const [list, setList] = useState<EquipmentInfo[]>([]);
  let equipment_list: EquipmentInfo[] = list;
  useEffect(() => {
    fetch(`http://localhost:3000/equipment/?page=${page}&limit=${take}`)
      .then(Response => Response.json())
      .then((data) => {
        equipment_list = data as EquipmentInfo[];
        setList(data);
    })},[]
  )
  if (Array.isArray(equipment_list)) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Equipment List</h1>
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {equipment_list.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description ?? '-'}</td>
                <td className="border px-4 py-2">{item.amount}</td>
                <td className="border px-4 py-2">{new Date(item.created_at).toISOString()}</td>
                <td className="border px-4 py-2">{new Date(item.updated_at).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }else if(Array.isArray(equipment_list) === false) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Equipment List</h1>
        <p>No data available</p>
      </div>
    );
  }
}