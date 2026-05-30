import {React, useNavigate, useState} from 'react';
import { DEPARTMENTS } from '../assets/assets';
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
    // const navigate = useNavigate()
    const [Loading, setLoading] = useState(false)
    const isEdit = !!initialData

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        if(isEdit){
            const pwd = formData.get("password")
            if(!pwd) formData.delete("password")
        }

        try {
            const url = isEdit ? `/employees/${initialData.id}`: "/employees";
            const method = isEdit ? "put" : "post";
            await api[method](url, formData)
            onSuccess ? onSuccess() : Navigate("/employees")
        } catch (error) {
            toast.error(error.response?.data?.error || error.message)
        }finally{
            setLoading(false)
        }
    }


  return (  
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl animate-fade-in">
        {/*Personal Information*/}
        <div className="card p-5 sm:p-6">
            <h3 className="font-medium mb-6 pb-4 border-b border-slate-100">Personal Information</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm tesxt-slate-700'>
                <div>
                    <label className='block mb-2'>First Name</label>
                    <input name='firstName' defaultValue={initialData?.firstName} required/>
                </div>
                <div>
                    <label className='block mb-2'>Last Name</label>
                    <input name='lastName' defaultValue={initialData?.lastName} required/>
                </div>
                <div>
                    <label className='block mb-2'>Phone Number</label>
                    <input name='phone' defaultValue={initialData?.phone} required/>
                </div>
                <div>
                    <label className='block mb-2'>Join Date</label>
                    <input type='date' name='joinDate' defaultValue={initialData?.joinDate ? new Date (initialData.joinDate).toISOString().split("T")[0] : ""} required/>
                </div>
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Bio (optional)</label>
                    <textarea className='resize-none' placeholder='Brief Description......' name='bio' defaultValue={initialData?.bio} rows={3}/>
                </div>
            </div>
        </div>

        {/*Employment Details*/}
        <div className='card p-5 sm:p-6'>
            <h3 className='text-base font-medium text-slate-900 mb-6 pb-6 border-b border-slate-100'>Employment Details</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
                <div>
                    <label className='block mb-2'>Department</label>
                    <select name="department" defaultValue={initialData?.department || ""}>
                        <option value="">Select Department</option>
                        {DEPARTMENTS.map((deptName)=>(
                            <option value={deptName} key={deptName}>
                                {deptName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className='block mb-2'>Position</label>
                    <input name='position' defaultValue={initialData?.position} required/>
                </div>
                <div>
                    <label className='block mb-2'>Basic Salary</label>
                    <input min="0" step="0.01" name='basicSalary' type='number' defaultValue={initialData?.basicSalary || 0} required/>
                </div>
                <div>
                    <label className='block mb-2'>Allowance</label>
                    <input name='allowance' type='number' min="0" step="0.01" defaultValue={initialData?.allowances || 0} required/>
                </div>
                <div>
                    <label className='block mb-2'>Deductions</label>
                    <input name='deductions' type='number' min="0" step="0.01" defaultValue={initialData?.deductions || 0} required/>
                </div>
                {isEdit && (
                    <div>
                        <label className='block mb-2'>Status</label>
                        <select name='employmentStatus' defaultValue={initialData?.employmentStatus}>
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </div>
                )}
            </div>
        </div>

        {/*Account Setup*/}
        <div className="card p-5 sm:p-6">
            <h3 className="text-base font-medium text-slate-900 mb-6 pb-6 border-b border-slate-100">Account Setup</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm tesxt-slate-700'>
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>Work Email</label>
                    <input type='email' name='email' defaultValue={initialData?.userId.email} required/>
                </div>
                {!isEdit && (
                    <div className='sm:col-span-2'>
                        <label className='block mb-2'>Temporary Password</label>
                        <input type='password' name='password' required />
                    </div>
                )}
                {isEdit && (
                    <div className='sm:col-span-2'>
                        <label className='block mb-2'>Change Password (optional)</label>
                        <input type='password' name='password' placeholder='Leave blank to keep current' />
                    </div>
                )}
                <div className='sm:col-span-2'>
                    <label className='block mb-2'>System Role</label>
                    <select name="role" defaultValue={initialData?.user?.role || "EMPLOYEE"}>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
            </div>
        </div>


        {/*Buttons*/}
        <div className='flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2'>
            <button onClick = {()=>(onCancel ? onCancel() : navigate(-1))} type='button' className='btn-secondary'>
                Cancel
            </button>
            <button type='submit' disabled={Loading} className='btn-primary flex items-center justify-center'>
                {Loading && <Loader2 className='w-4 h-4 animate-spin mr-2'/>}
                {isEdit ? "Update Employee" : "Create Employee"}
            </button>
        </div>
        

    </form>
    )
}

export default EmployeeForm