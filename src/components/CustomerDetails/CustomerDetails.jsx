import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';


export default function CustomerDetails() {

const [spacificTransactions, setSpacificTransactions]= useState(null)
const [spacificCustomer, setSpacificCustomer]= useState('')


const [arrOfDate, setArrOfDate]= useState([])
const [arrOfMount, setArrOfMount]= useState([])

let arrofdatatoSet = []
let arrofamounttoSet = []


 const {customerId} =useParams()

 async function fetchTransaction (){
          try{
            const {data} = await axios.get('http://localhost:3001/transactions',{
              params: {customer_id: customerId}
            })

            if(data !== null){
              setSpacificTransactions(data)
              for(let i =0; i < data.length; i++){
                arrofdatatoSet.push(data[i].date)
                arrofamounttoSet.push(data[i].amount)
              }
              setArrOfDate(arrofdatatoSet)
              setArrOfMount(arrofamounttoSet)
            }
          }catch(err){
            console.log(err);
          }
} 

async function fetchCustomers(){
    try {
     const {data}= await axios.get('http://localhost:3001/customers',{
         params: {id: customerId}
      })

      if(data){
          setSpacificCustomer(data)
          console.log(data);
      }
    } catch (err) {
        console.log(err);
    }
}

  useEffect(function(){
     
       fetchCustomers()
      fetchTransaction()
  },[])

  return <>
  

      <div className='container-fluid bg-body-secondary w-100 pt-5' style={{minHeight: '100vh'}} >
          <div className="container bg-white rounded-3 p-5">
            <div className='border-bottom pb-2'>
              <div className='w-25 d-flex align-items-center'>
                  <img src={require('../../Images/man.png')} alt="Image Png" className='w-25' />
                  <h3 className='ms-2 mt-2'>{spacificCustomer[0]?.name}</h3>
              </div>
            </div>

            <table className="table-design-custom text-center border-bottom">
                  <thead className="shadow-sm p-3 mb-5 bg-body-tertiary text-black-50"> 
                    <tr>
                      <th>#</th>
                      <th className='text-dark'>transaction Amount</th>
                      <th >Date Of Transactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spacificTransactions?.map((transaction,idx)=>{
                        return<tr key={idx}>
                          <td>{idx}</td>
                          <td>{transaction.amount} EGP</td>
                          <td>{transaction.date}</td>
                        </tr>
                    })}
                    
                  </tbody>
           </table>
              <div className='w-50 mt-5 m-auto'> 
                      <Bar

                    data={{

                      labels: arrOfDate,
                      datasets: [{
                        label: 'Amount',
                        data: arrOfMount,
                       
                      }]
                    }}
                    
                    options={{
                      plugins: {
                        legend: {
                          display: true,
                          position: 'top'
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false
                          }
                        },
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Amount (EGP)'
                          }
                        }
                      },
                      responsive: true,
                      barThickness: 70, // Set the width of the bars/columns
                      indexAxis: 'x' // Set the axis for the data to be displayed
                    }}
            />
              </div>
            
            </div>
      </div>

      
  </>
}
