import axios from 'axios';
import './customerTable.css'
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';





export default function CustomerTable() {

  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchTermOnCustomer, setSearchTermOnCustomer] = useState(null);
  const [searchTermONtransaction, setSearchTermONtransaction] = useState(null);

  
  let numCount = 0

  async function GetCustomers(){
      try{
        console.log(searchTermOnCustomer);
          const {data} = await axios.get('http://localhost:3001/customers',{
            params:{name: searchTermOnCustomer}
          })
          console.log(data);
          if(data.length>0){
            // console.log(data, 'custom');

            setCustomers(data)
          }
      }catch(err){
          console.log(err);
      }
  }

  async function Gettransactions(){
      try {
       const {data} = await axios.get('http://localhost:3001/transactions',{
        params: {amount : searchTermONtransaction}
       }) 

       if(data.length>0){
        // console.log(data, 'trans');
         setTransactions(data)
       }

      } catch (err) {
          console.log(err);
      }
  }
  


  async function showAllDetails(){
        await GetCustomers()
        await Gettransactions()
  }


  async function setchangeToSearch (values){
      setSearchTermONtransaction(values.searchTermONtransaction)
      setSearchTermOnCustomer(values.searchTermOnCustomer)


      await showAllDetails()
  }

  const navTo = useNavigate()

  const formi = useFormik({
    initialValues: {
      searchTermOnCustomer: '',
      searchTermONtransaction: ''
    },
    onSubmit: async (values) => {
      setSearchTermOnCustomer(values.searchTermOnCustomer);
      setSearchTermONtransaction(values.searchTermONtransaction);
      await showAllDetails();
    }

  });
 

  useEffect(function(){
      showAllDetails()
     
  },[searchTermOnCustomer, searchTermONtransaction])


  return <>
        <div className='container-fluid bg-body-secondary w-100 pt-5' style={{minHeight: '100vh'}} >

    <div className="container bg-white rounded-3 p-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>Customer Transactions</h2>
        {/* <button className="btn btn-primary">+ Add customer</button> */}
      </div>


      <form onSubmit={formi.handleSubmit} className='d-flex justify-content-between'>

            <div className="input-group mb-3 w-25">
                    <button className="btn btn-danger" id="search-icon" type='submit'>
                      <i className="fa-solid fa-search"></i>
                    </button>



                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Customer Name"
                        value={formi.values.searchTermOnCustomer}
                        id='searchTermOnCustomer'
                        name='searchTermOnCustomer'
                        onChange={(e) => {
                          formi.handleChange(e);
                          setSearchTermOnCustomer(e.target.value);
                        }}  
                        onBlur={() => {
                          if (formi.values.searchTermOnCustomer === '') {
                            setSearchTermOnCustomer('');
                            showAllDetails();
                          }
                       }}
                  />
                  
                  </div>
             <div className="input-group mb-3 w-25">
                    <button className="btn btn-danger" id="searchTermONtransaction" type='submit'>
                      <i className="fa-solid fa-search"></i>
                    </button>



                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search By Mout Of Transaction"
                      id='searchTermONtransaction'
                      name='searchTermONtransaction'
                      value={formi.values.searchTermONtransaction}
                      onChange={(e)=>{
                        formi.handleChange(e);
                        setSearchTermONtransaction(e.target.value)
                      }}
                      onBlur={()=>{
                        if (formi.values.searchTermONtransaction === '') {
                          setSearchTermONtransaction('');
                          showAllDetails();
                        }
                      }}
                    />
                  
                  </div>

      </form>
      
      <table className="table-design-custom text-center">
        <thead className="shadow-sm p-3 mb-5 bg-body-tertiary text-black-50"> 
          <tr>
            <th>#</th>
            <th className='text-dark'>Customer Name</th>
            <th>transaction Amount</th>
            <th >Date Of Transactions</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
        {customers.map((customer,idx)=>{
          let id = customer.id

          let res = transactions.filter((transaction)=> transaction.customer_id == id)
              
          return res.map((item, index)=>{

            return <tr key={item.id}>
             <td>{numCount ++}</td>
             <td>{customer.name}</td>

              <td>{item.amount} EGP</td>
              <td>{item.date}</td>
              <td>
                <button className='btn btn-danger text-white' onClick={()=>{navTo(`/customer/${id}`)}}> View Details</button>
              </td>
             </tr>
          })

        })}


{/*  */}

        </tbody>

      </table>
    </div>

    </div>
</>

}
