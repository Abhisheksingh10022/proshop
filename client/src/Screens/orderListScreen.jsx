import React,{useEffect} from "react";
import {Table,Button} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../Components/loader";
import Message from "../Components/Message";
import{LinkContainer} from "react-router-bootstrap";
 import { listOrders } from "../Actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderListScreen=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const orderList=useSelector(state=>state.orderList)
    const {loading,error,orders}=orderList
    console.log(orders)

    

    const userLogin=useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

    
     useEffect(()=>{
         if(userInfo&&userInfo.isAdmin)
         {
         dispatch(listOrders())
         
         }
         else{
             navigate('/login')
         }
     },[dispatch,userInfo,navigate])

  return(
     <>
  
      
        {
        loading?<Loader />:error?<Message variant='danger'></Message>:(
       <Table striped bordered hover responsive className="table-sm">
           <thead>
               <tr>
                   
                   <th>USER</th>
                   <th>DATE</th>
                   <th>TOTAL</th>
                   <th>PAID</th>
                   <th>DELIVERED</th>
                   <th></th>
               </tr>
           </thead>
           <tbody>
               {loading&&<Loader />}
               {error&&<Message variant='danger'>{error}</Message>}
        {orders&&orders.map((order)=>(
                   <tr key={order._id}>
                       <td>{orders.user&&order.user.name}</td>
                     
                       <td>{orders && order.createdAt.substring(0,10)}</td>
                       <td>${orders&&order.totalPrice}</td>
                       <td>
                       {orders&&order.isPaid?(order.paidAt.substring(0,10)):(
                             <i className='fas fa-times' style={{color:'red'}}></i>
                           )
                           }
                           
                       </td>
                       <td>
                       {orders&&order.isDelivered?(order.deliveredAt.substring(0,10)):(
                             <i className='fas fa-times' style={{color:'red'}}></i>
                           )
                           }
                           
                       </td>
                       <td>
                           <LinkContainer to={`/order/${order._id}`}>
                           <Button variant='light' className="btn-sm">
                             Details
                           </Button>
                           </LinkContainer>
                       </td>

                   </tr>
               ))}
           </tbody>
       </Table>
        )
        }
    

      </>
  )
    }
export default OrderListScreen;