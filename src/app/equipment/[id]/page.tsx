"use client"
import { EquipmentInfo } from '@/types/equipment';
import { useState, useEffect, use } from 'react';

export default function Equipment_info(
  { params }: {
    params:Promise<{ id: string }>
  }) 
  {
  const [info, setInfo] = useState<EquipmentInfo[]>([]);
  let equipments_info: EquipmentInfo[] = info;
  const param = use(params);
  useEffect(() => {
    fetch(`http://localhost:3000/equipment/${param.id}`)
      .then(Response => Response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            equipments_info = data as EquipmentInfo[];
          }
          setInfo(data);
        });
  }, []);
  if (Array.isArray(info)) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Equipment Info</h1>
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
            {equipments_info.map((info) => (
              <tr key={info.id}>
                <td className="border px-4 py-2">{info.name}</td>
                <td className="border px-4 py-2">{info.description ?? '-'}</td>
                <td className="border px-4 py-2">{info.amount}</td>
                <td className="border px-4 py-2">{new Date(info.created_at).toISOString()}</td>
                <td className="border px-4 py-2">{new Date(info.updated_at).toISOString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }else if (info === null) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Equipment Info</h1>
        <p>No data available</p>
      </div>
    );
  }
}
