import React from 'react';

const DataTable = ({ columns, data, emptyMessage = 'Tidak ada data' }) => (
  <div className="overflow-x-auto -mx-1">
    <table className="w-full text-sm min-w-[500px]">
      <thead>
        <tr className="border-b border-slate-100">
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-3 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="px-3 py-12 text-center text-slate-400 text-sm">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-slate-50 hover:bg-blue-50/40 transition-colors duration-100"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-3 text-slate-700 whitespace-nowrap">
                  {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
