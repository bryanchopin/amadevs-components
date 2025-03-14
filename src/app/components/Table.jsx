'use client';
import Image from "next/image";
import DeleteMeetingBtn from "./buttons/DeleteMeetingBtn";
import GotoMeetingBtn from "./buttons/GotoMeetingBtn";
import { usePatientsContext } from "@/app/context/PatientsContext";


const UserTable = ({ user }) => {
  const { filteredData } = usePatientsContext();
  return (
    <>
      <div className="relative shadow-md sm:rounded-lg">
        <table className="min-w-full divide-y table-fixed divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all" aria-describedby="checkbox-1" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300"/>
                    <label htmlFor="checkbox-all" className="sr-only"> checkbox </label>
                  </div>
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase">
                  Nombre
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase">
                  Motivo
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase" >
                  Telefono
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase" >
                  Fecha
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase" >
                  Dr preferido
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase" >
                  Estado
                </th>
                <th scope="col" className="p-4 text-xs font-medium text-left text-gray-700 uppercase" >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-opacity duration-300 ease-in-out opacity-100'}`}
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      {/* <input
                        id={`checkbox-${index}`}
                        aria-describedby={`checkbox-${index}`}
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300"
                      /> */}
                      <label htmlFor={`checkbox-${index}`} className="">
                        <span className="bg-gray-200 text-blue-800 text-xs font-medium me-2 px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300">{index + 1}</span>
                      </label>
                    </div>
                  </td>
                  <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                    <Image src="/Logo.png" alt="Logo Clinica dental luz" width={40} height={40} className="rounded-full" />
                    <div className="text-sm font-normal text-gray-700">
                      <div className="text-base font-semibold text-gray-900">
                        {item.name}
                      </div>
                      <div className="text-sm font-normal text-gray-500">
                        {item.email}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-700 truncate xl:max-w-xs">
                    {item.reason_consultation}
                  </td>
                  <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.phone}
                    </div>
                  </td>
                  <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.date.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.preference_doctor}
                    </div>
                  </td>
                  <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Vigente
                    </div>
                  </td>
                  <td className="p-4 space-x-2 whitespace-nowrap">
                    <GotoMeetingBtn id={item.id} />
                    {(user.role === "admin" || user.role === "manager") && (
                      <DeleteMeetingBtn id={item.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
