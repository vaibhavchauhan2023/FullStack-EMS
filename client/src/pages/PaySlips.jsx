import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslips/PayslipList";
import GeneratePaySlipForm from "../components/payslips/GeneratePaySlipForm";
import EmployeeForm from "../components/EmployeeForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const PaySlips = () => {
  const[payslips, setPayslips] = useState([])
  const[employees, setEmpoloyees] = useState([])
  const [loading , setLoading] = useState(true);
  const {user} = useAuth();
  const isAdmin = user.role === "ADMIN";

  const fetchPayslips = useCallback(
    async ()=>{
      try {
        const res = await api.get('/payslips')
        setPayslips(res.data.data || [])
      } catch (error) {
        toast.error(error?.response?.data?.error || error?.message);
      }finally{
        setLoading(false)
      }
  },[]) 

  useEffect(()=>{
    fetchPayslips()
  },[fetchPayslips])

  useEffect(()=>{
    if(isAdmin) api.get('/employees').then((res)=>setEmpoloyees(res.data.filter((e)=> !e.isDeleted))).catch(()=>{})
  },[isAdmin])

  if(loading) return <Loading />

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col justify-between sm:flex-row items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
        </div> 
        {isAdmin && <GeneratePaySlipForm employee ={employees} onSuccess={fetchPayslips}/>}
      </div>
      <PayslipList payslip={payslips} isAdmin={isAdmin}/>
    </div>
  )
}

export default PaySlips