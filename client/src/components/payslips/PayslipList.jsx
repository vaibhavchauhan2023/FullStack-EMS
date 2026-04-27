import { format, isDate, isLastDayOfMonth } from 'date-fns';
import { Download } from 'lucide-react';

const PayslipList = ({payslip, isAdmin}) => {

  return (
    <div className="card overflow-hidden">
        <div className="overflow-x-auto">
            <table className="table-modern">
                <thead>
                    <tr>
                        {isAdmin && <th>Employee</th>}
                        <th>Period</th>
                        <th>Basic Salary</th>
                        <th>Net Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payslip.length === 0 ? (
                        <tr>
                            <td colSpan={isAdmin ? 5 : 4} className="text-center py-12 text-slate-400">
                                No Payslips found
                            </td>
                        </tr>
                    ) : (
                        payslip.map((slip)=>{
                            
                            return (
                                <tr key={slip._id || slip.id}>
                                    {isAdmin && (
                                        <td className='text-slate-900'>
                                            {slip.employee?.firstName}
                                            {slip.employee?.lastName}
                                        </td>
                                    )}

                                    <td className="text-slate-500">
                                        {format(new Date(slip.year, slip.month - 1), "MMM yyyy")}
                                    </td>

                                    <td className=" text-slate-500">
                                        ${slip.basicSalary?.toLocaleString()}
                                    </td>

                                    <td className=" text-slate-800 font-medium" title={slip.reason}>
                                        ${slip.netSalary?.toLocaleString()}
                                    </td>

                                    <td>
                                        <button onClick={()=> window.open(`print/payslips/${payslip._id || payslip.id}`)} className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors ring-1 ring-blue-600/10'>
                                            <Download className='w-3 h-3 mr-1.5' />Download
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default PayslipList