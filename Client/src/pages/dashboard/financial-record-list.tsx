import { useMemo, useState } from "react";
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/financial-record-context";
import { useTable, Column } from "react-table";
import {
  Trash2,
  Edit2,
  Save,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Dropdown options (kept the same as in original)
const categories = [
  "Food",
  "Rent",
  "Salary",
  "Utilities",
  "Transportation",
  "Health and Insurance",
  "Education",
  "Savings",
  "Investment",
  "Entertainment",
  "Other",
];

const paymentMethods = [
  "Credit Card",
  "Debit Card",
  "UPI",
  "Cash",
  "Cheque",
  "Bank Transfer",
  "Other",
];

const types = ["Income", "Expense"];

// Enhanced EditableCell component
const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
  editableOptions,
  additionalClass = "",
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      className={`relative group ${editable ? "cursor-pointer" : ""}`}
      onClick={() => editable && setIsEditing(true)}
    >
      {isEditing ? (
        <div className='flex items-center'>
          {editableOptions ? (
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              onBlur={onBlur}
              className='w-full border-2 border-indigo-300 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              {editableOptions.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
              onBlur={onBlur}
              className={`w-full border-2 border-indigo-300 rounded-lg px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 ${additionalClass}`}
            />
          )}
          <div className='flex ml-2'>
            <button
              onClick={onBlur}
              className='text-green-600 hover:bg-green-100 p-1 rounded-full'
            >
              <Save size={18} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='text-red-600 hover:bg-red-100 p-1 rounded-full ml-1'
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className='flex items-center'>
          <span className={`font-semibold ${additionalClass}`}>
            {value.toString()}
          </span>
          {editable && (
            <Edit2
              size={16}
              className='ml-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            />
          )}
        </div>
      )}
    </div>
  );
};

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();
  const [filterType, setFilterType] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Clear filter function
  const clearFilter = () => {
    setFilterType(null);
  };

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]._id;
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
  };

  // Filtered and sorted records
  const processedRecords = useMemo(() => {
    let filteredRecords = filterType
      ? records.filter((record) => record.type === filterType)
      : records;

    if (sortColumn) {
      filteredRecords.sort((a, b) => {
        const valueA = a[sortColumn as keyof FinancialRecord];
        const valueB = b[sortColumn as keyof FinancialRecord];

        if (valueA !== undefined && valueB !== undefined) {
          if (valueA < valueB) {
            return sortDirection === "asc" ? -1 : 1;
          }
          if (valueA > valueB) {
            return sortDirection === "asc" ? 1 : -1;
          }
        }

        return 0;
      });
    }

    return filteredRecords;
  }, [records, filterType, sortColumn, sortDirection]);

  const columns: Column<FinancialRecord>[] = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props: any) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        accessor: "type",
        Header: () => (
          <div className='flex items-center'>
            <span>Type</span>
            <div className='flex items-center ml-2'>
              <div
                className='cursor-pointer'
                onClick={() => {
                  setSortColumn("type");
                  setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                }}
              >
                {sortColumn === "type" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
              <Filter
                size={16}
                className='ml-1 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  setFilterType(filterType === "Income" ? "Expense" : "Income");
                }}
              />
            </div>
          </div>
        ),
        Cell: (props: any) => {
          const { value } = props;
          return (
            <EditableCell
              {...props}
              updateRecord={updateCellRecord}
              editable={true}
              editableOptions={types}
              additionalClass={
                value === "Income"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            />
          );
        },
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row, value }: any) => {
          const type = row.original.type;
          const formattedValue =
            type === "Income"
              ? `+${Number(value).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : `-${Number(value).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;

          return (
            <EditableCell
              value={formattedValue}
              row={row}
              column={{ id: "amount" }}
              updateRecord={updateCellRecord}
              editable={true}
              additionalClass={
                type === "Income"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            />
          );
        },
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props: any) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
            editableOptions={categories}
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props: any) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
            editableOptions={paymentMethods}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }: any) => {
          const formattedDate = new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return (
            <EditableCell
              value={formattedDate}
              updateRecord={updateCellRecord}
              editable={false}
            />
          );
        },
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }: any) => (
          <div className='flex space-x-2'>
            <button
              onClick={() => deleteRecord(row.original._id ?? "")}
              className='text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors'
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [records, filterType, sortColumn, sortDirection]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: processedRecords,
    });

  if (!records || records.length === 0) {
    return (
      <div className='text-center text-gray-500 mt-10'>
        No financial records found. Start tracking your finances!
      </div>
    );
  }

  return (
    <div className='bg-white rounded-3xl shadow-2xl overflow-hidden'>
      <div className='px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Financial Records</h1>
        <div className='flex items-center space-x-2'>
          {filterType && (
            <>
              <span className='bg-white/20 px-3 py-1 rounded-full'>
                {filterType} Only
              </span>
              <button
                onClick={clearFilter}
                className='bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full flex items-center'
              >
                <X size={16} className='mr-1' /> Clear Filter
              </button>
            </>
          )}
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table {...getTableProps()} className='w-full'>
          <thead className='bg-emerald-50'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className='px-6 py-3 text-left text-xs font-medium text-emerald-600 uppercase tracking-wider'
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className='divide-y divide-emerald-200'
          >
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className='hover:bg-emerald-50 transition duration-200'
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className='px-6 py-4 whitespace-nowrap'
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialRecordList;
