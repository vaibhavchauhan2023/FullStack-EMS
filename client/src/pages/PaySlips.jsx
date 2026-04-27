import { useCallback, useEffect, useState } from "react"
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslips/PayslipList";
import GeneratePaySlipForm from "../components/payslips/GeneratePaySlipForm";
import EmployeeForm from "../components/EmployeeForm";

const PaySlips = () => {
  const[payslips, setPayslips] = useState([])
  const[employees, setEmpoloyees] = useState([])
  const [loading , setLoading] = useState(true);
  const isAdmin = true;

  const fetchPayslips = useCallback(
    async ()=>{
    setPayslips(dummyPayslipData)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  },[]) 

  useEffect(()=>{
    fetchPayslips()
  },[fetchPayslips])

  useEffect(()=>{
    if(isAdmin) setEmpoloyees(dummyEmployeeData)
  },[isAdmin])

  if(loading) <Loading />

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