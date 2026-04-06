import { Building2Icon, CalendarIcon, FileTextIcon, UserIcon } from 'lucide-react'
import React from 'react'

const AdminDashboard = ({data}) => {

    const cards = [
        
        {
            icon: UserIcon,
            value: data.totalEmployees,
            label: "Total Employees",
            description: "Active Workforce"
        },
        {
            icon: Building2Icon,
            value: data.totalDepartments,
            label: "Departments",
            description: "Organization Units"
        },
        {
            icon: CalendarIcon,
            value: data.todayAttendance,
            label: "Today's Attendance",
            description: "Checked in today"
        },
        {
            icon: FileTextIcon,
            value: data.pendingLeaves,
            label: "Pending Leaves",
            description: "Awaiting approval"
        }
    ]

  return (
    <div className='animate-fade-in'>
        {/*Header Section*/}
        <div className='page-header'>
            <h1 className='page-title'>Dashboard</h1>
            <p className='page-subtitle'>
                Welcome back, Admin - here's your overview
            </p>
        </div>

        {/*Card Section*/}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8'>
                {cards.map((card, index)=>(
                    <div key={index} className='card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between'>
                        <div>
                            <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
                            <p className='text-sm font-medium text-slate-700'>{card.label}</p>
                            <p className='text-2xl font-bold text-slate-900 mt-1'>{card.value}</p>
                        </div>
                        <card.icon className=''/>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default AdminDashboard