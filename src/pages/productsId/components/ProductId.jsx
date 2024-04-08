import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { A11y, Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '../../loader/Components/Loader.jsx';
import { Rating } from '@mui/material';
import { Bounce, toast } from 'react-toastify';
import 'swiper/css/navigation';
import './productsId.css'



export default function ProductsId() {
    const {id}=useParams('id');
    const [product,setProduct]=useState([]);
    const [loader,setLoader]=useState(true);
    const [error,setError]=useState("");
    
    const token = localStorage.getItem("token");
    const [values,setValues] =useState({
      comment:'',
      rating:"",
    });
  
   
    const getProducts=async()=>{
      try{
        const {data}=await axios.get(`/products/${id}`);
        setProduct(data.product);
      }
      catch(error){
        setError("error loading ");
      }
      finally{
        setLoader(false)
      }
    }
    useEffect(()=>{
        getProducts();  
    },[]);
   
    const addToCart = async (productId)=>{
      const token = localStorage.getItem("token");
    
      try{
      const {data}= await axios.post(`/cart`,{
        productId
      },{
        headers:{
          Authorization:`Tariq__${token}`
        }
      }
  
      );
     
      if (data.message == 'success'){
        toast.success("Add To Cart is successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });  
       }
       
       
      }
    catch(error){
      if(!token){
        toast.error("plz first Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
      }
        else
        {
          toast.error(error.response.data.message ,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
    }finally{
      setLoader(false);
    }
  }
   
    const handelSubmit = async (e) => {
      e.preventDefault();
      setLoader(true);
      try {
        const { data } = await axios.post(
          `/products/${id}/review`,
          values,
          { headers: { Authorization:`Tariq__${token}` } }
        );
        if (data.message == "success") {
          toast.success("your comment is puplished successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(`/products/${id}`);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoader(false)
      }
    };

    if(loader){
      return <Loader/>
    }
   
  return (
    <div className="padding-bottom">
    {error ?? <p className="error" > {error}</p>}
    {   
   <div className=" container  d-flex productid ">
    <div className="container stylepro w-50">
    <div>
               
               <Swiper
                 slidesPerView={1}
                 modules={[Navigation, Autoplay, A11y]}
                 onSwiper={() => console.log()}
                 onSlideChange={() => console.log()}
                 autoplay={{
                   delay: 2000,
                   disableOnInteraction: false,
                 }}
                 navigation={true}
               >
                 {product.subImages.length > 0 ? (
                   product.subImages.map((image) => (
                     <SwiperSlide key={image.public_id}>
                       <img
                         className="w-100 proimg"
                         src={image.secure_url}
                         alt="slide image"
                       />
                     </SwiperSlide>
                   ))
                 ) : (
                   <p>no sub image</p>
                 )}
               </Swiper>
             </div> 
    </div>
   <div className="container description shadow-lg p-3 mb-5 bg-white rounded w-50">
    <div className="d-flex flex-sm-column gap-2 descr">
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    </div>
    <div className=" comen d-flex flex-sm-column gap-2">
    <div className="style ">
    <span > ${product.price}</span>
    </div>
    <div className='rating'>
    <Rating
      name="simple-controlled"
      value={product.rating}
      onChange={(event, newValue) => {
        setValues(newValue);
  }}
    />
    </div>
    <div className="stock d-flex  ">
    <span>Stock : {product.stock}</span>
    </div>
    </div>
   
     <div className="d-flex gap-3 py-3">
      <button className="btn btn-outline-secondary " onClick={()=>addToCart (product.id)}>Add to cart</button>
     </div>
   
    
   </div>

   </div>
}

<form className="container align-items-center d-flex justify-content-md-center" onSubmit={handelSubmit}>
  <div className=" w-100 gap-2 my-3 d-flex flex-column justify-content-center  ">
<label >comment</label>
<input className="form-control rounded-1 " type="comment"  name="comment" value={values.comment} onChange={(e)=>setValues({...values,comment:e.target.value})} />
<Rating className="mt-1"
      name="simple-controlled"
      value={product.rating}
      onChange={(event) => {
       setValues({...values , rating: event.target.value})
  }}
    />
     <button className="btn btn-outline-secondary" type='submit'>submit</button> 
     </div>   
</form>

   <h2 className="text-center ">Reviews</h2>
{ 
          product.reviews.map(revi=>
            <div className="container"> 
             
            <div className="review bg-light px-1 " key={revi._id}>
            <p>{revi.review}</p>
            <h2>{revi.comment}</h2>
            <span>{revi.rating}</span>
            <h3>{revi.name}</h3>
            </div>
            </div>
            )  
        }
   </div>
  )
}
