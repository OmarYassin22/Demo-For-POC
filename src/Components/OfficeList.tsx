// import React, { useEffect, useState } from 'react';
// import {
//   createColumnHelper,
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getPaginationRowModel,
// } from '@tanstack/react-table';
// import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
// import '../styles/OfficeList.css'; // Import CSS file
// import Header from './Header';
// import Footer from './Footer';

// // Define the structure of the office data
// interface Office {
//   Name: string;
//   Id: string;
// }

// const OfficeList: React.FC = () => {
//   const [offices, setOffices] = useState<Office[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate(); // Use navigate for page navigation

//   // Check if the user is logged in, if not redirect to login page
//   useEffect(() => {
//     if (localStorage.getItem('isLoggedIn') !== 'true') {
//       navigate('/login'); // Redirect to login page if not logged in
//     } else {
//       // Fetch data if logged in
//       fetchData();
//     }
//   }, [navigate]);
//   const fetchData = () => {
   
//     fetch('/src/mocks/OfficeMock.json')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('لا يوجد مكاتب');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setOffices(data.data.result); // Set the office data
//       })
//       .catch((error) => {
//         console.error('حدث خطأ أثناء التحميل:', error);
//         setError('حدث خطأ أثناء التحميل:. حاول مرة أخري.');
//       });
//   };

//   // Column definitions using @tanstack/react-table
//   const columnHelper = createColumnHelper<Office>();
//   const columns = [
//     columnHelper.accessor('Name', {
//       header: 'المكتب',
//       cell: (info) => info.getValue(),
//     }),
//     // columnHelper.accessor('Id', {
//     //   header: 'Office ID',
//     //   cell: (info) => info.getValue(),
//     // }),
//     columnHelper.display({
//       id: 'actions',
//       header: 'طلبات التفويض',
//       cell: ({ row }) => (
//         <button
//           onClick={() => handleOfficeRequests(row.original.Id)}
//           className="details-btn"
//         >
//           Details
//         </button>
//       ),
//     }),
//   ];

//   const table = useReactTable({
//     data: offices,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: { pagination: { pageSize: 5 } },
//   });

//   const handleOfficeRequests = (id: string) => {
//     alert(`طلبات التفويض للمكتب: ${id}`);
//   };

//   // Handle logout


//   return (
//     <div className="min-h-screen">
//       {/* Header with logout button */}
//      <Header/>

//       <div className="container">
//         {error ? (
//           <div className="error-message">{error}</div>
//         ) : (
//           <div className="table-container">
//             <table className="table">
//               <thead>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(header.column.columnDef.header, header.getContext())}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="pagination-controls">
//               <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//                 السابق
//               </button>
//               <span>
//                 صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
//               </span>
//               <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//                 التالي
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer/>
//     </div>
//   );
// };

// export default OfficeList;



// src/Components/OfficeList.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OfficeList.css';
import Header from './Header';
import Footer from './Footer';
import DataTable from './DataTable'; // Import DataTable component

interface Office {
  Name: string;
  Id: string;
}

const OfficeList: React.FC = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if the user is logged in, if not redirect to login page
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = () => {
    fetch('/src/mocks/OfficeMock.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('لا يوجد مكاتب');
        }
        return response.json();
      })
      .then((data) => {
        setOffices(data.data.result);
      })
      .catch((error) => {
        console.error('حدث خطأ أثناء التحميل:', error);
        setError('حدث خطأ أثناء التحميل:. حاول مرة أخري.');
      });
  };

  const handleOfficeRequests = (id: string) => {
    navigate(`/offices/${id}/requests`);
  };

  const columns = [
    {
      header: 'المكتب',
      accessorKey: 'name', // Use accessorKey to define the field for the column
    },
    {
      header: '',
      id: 'actions',
      cell: ({ row }: { row: any }) => (
        <button onClick={() => handleOfficeRequests(row.original.id)} className="details-btn">
          طلبات التفويض
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <DataTable data={offices} columns={columns} onAction={handleOfficeRequests} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OfficeList;
