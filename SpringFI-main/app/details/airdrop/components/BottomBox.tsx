import React from "react";

interface Column {
  id: "allocations" | "amount" | "symbol";
  label: string;
  minWidth?: string;
  align?: "left" | "right";
}

interface DataRow {
  allocations: string;
  amount: number;
  symbol: string;
}

const Table = ({ columns, rows }: { columns: Column[]; rows: DataRow[] }) => {
  return (
    <div className="mt-4 mx-auto rounded-lg">
      <table className="min-w-full">
        <thead className=" -mt-2">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="py-2 px-4 text-left "
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 dark:divide-stone-900 divide-stone-100 rounded-2xl">
          {rows.map((row) => (
            <tr
              key={row.allocations}
              className="border-b border-dashed border-white/10"
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={`py-2 px-4 `}
                  style={{ minWidth: column.minWidth }}
                >
                  {row[column.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface Props {
  allocations: string;
  amount: number;
  symbol: string;
}

const All: React.FC<Props> = ({ allocations, amount, symbol }) => {
  const rows: DataRow[] = [
    {
      allocations,
      amount,
      symbol,
    },
  ];

  const columns: Column[] = [
    {
      id: "allocations",
      label: "",
      minWidth: "350px",
      align: "left",
    },
    {
      id: "amount",
      label: "",
      minWidth: "",
      align: "right",
    },
    {
      id: "symbol",
      label: "",
      minWidth: "",
      align: "right",
    },
  ];

  return (
    <div className=" w-full">
      <Table columns={columns} rows={rows} />
    </div>
  );
};

export default All;
