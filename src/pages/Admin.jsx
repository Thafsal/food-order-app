import React, {useState} from "react";
import productsData from "../data/products";



export default function Admin() {
  const [items, setItems] = useState(productsData);
  const [form, setForm] = useState({name:"", price:"", category:"", desc:""});

  function create() {
    const id = Math.max(0, ...items.map(i=>i.id)) + 1;
    setItems(prev => [...prev, {...form, id: id, price: Number(form.price)}]);
    setForm({name:"", price:"", category:"", desc:""});
  }

  function remove(id) { setItems(prev => prev.filter(x => x.id !== id)); }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Admin Panel (Frontend)</h2>
      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
        <h3 className="font-medium mb-2">Add Product</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Name" className="border p-2 rounded"/>
          <input value={form.price} onChange={e => setForm({...form, price:e.target.value})} placeholder="Price" type="number" className="border p-2 rounded"/>
          <input value={form.category} onChange={e => setForm({...form, category:e.target.value})} placeholder="Category" className="border p-2 rounded"/>
          <button onClick={create} className="bg-blue-600 text-white px-3 rounded">Add</button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium">Products (Local)</h3>
        <ul className="space-y-2 mt-2">
          {items.map(i => (
            <li key={i.id} className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded">
              <div>
                <div className="font-semibold">{i.name}</div>
                <div className="text-sm text-gray-500">₹{i.price} • {i.category}</div>
              </div>
              <div>
                <button onClick={() => remove(i.id)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
