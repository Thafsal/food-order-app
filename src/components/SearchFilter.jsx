import React from "react";

export default function SearchFilter({ query, setQuery, category, setCategory, categories }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="border rounded px-3 py-2 w-full sm:w-1/2" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="border rounded px-3 py-2">
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}
