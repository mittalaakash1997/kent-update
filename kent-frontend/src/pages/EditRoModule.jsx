import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EditRoModule() {

  const [modelId, setModelId] = useState('');
  const [modelName, setModelName] = useState('');
  const navigate = useNavigate();

  const postData = (e) => {
    e.preventDefault();
    if (!modelId) {
      toast.error("please enter Model ID", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  else if (!modelName) {
      toast.error("please enter Model Name", {
        position: toast.POSITION.TOP_CENTER
      })
  }
    else {
      if (!id) {
        addRoModel();
      }
      else {
        updateRoModel(id);
      }
    }
  }

  // add Model
  const addRoModel = () => {
    axios.post(`${process.env.React_App_Host}/addRoModels`, {
      modelId,
      modelName
    })
    navigate("/admin/products");
    toast.success("New Product Added");
  }

  // update Model
  const updateRoModel = (id) => {
    // console.log(modelId)
    // console.log(modelName)
    // console.log(id)
    axios.put(`${process.env.React_App_Host}/updateRoModels/`, {
      id,
      modelId,
      modelName
    })
    navigate("/admin/products");
    toast.success("Product Edited");
  }

  const {id} = useParams();

    // single user

    useEffect(()=>{
        
        if(id){
            getSingleRoModel(id);
        }
          
      },[id]);
    
      const getSingleRoModel = async (id)=>{
        const url = `${process.env.React_App_Host}/singleRoModels/` + id;
        fetch(url).then(resp=>resp.json())
        .then(resp=>{
            if(resp.status === 200){
                // console.log(resp.response[0])
                setModelId(resp.response[0].model_id);
                setModelName(resp.response[0].model_name);
            }
        }
        )
      }


  return (
    <>
 {/* breadcrumb */}
 <div className="page-header">
                    <div className="page-block">
                        <div className="row align-items-center">
                            <div className="col-md-12">
                                <div className="page-header-title">
                                {
                                        !id ?
                                        <h5 className="m-b-10">Add Products</h5>                                        
                                        :
                                        <h5 className="m-b-10">Update Products</h5>                                         
                                        
                                    }
                                </div>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to={"/admin"}><i className="feather icon-home"></i></NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={"/admin/products"}>Products</NavLink></li>
                                    {
                                        !id ?
                                        <li className="breadcrumb-item"><NavLink to={"/admin/add-products"}>Add Product</NavLink></li>
                                        :
                                            <li className="breadcrumb-item"><NavLink to={`/admin/products${id}`}>Update Product</NavLink></li>
                                        
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* form */}
                <div className="main-body">
                    <div className="page-wrapper">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                    {
                                    !id ?
                                    <h5>Add Product</h5>
                                    :
                                    <h5>Edit Product</h5>
                                }
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={postData}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='model id'>Product ID</label>
                                                        <input type="text" className="form-control mt-2" name='ModelId' onChange={(e) => setModelId(e.target.value)} value={modelId} placeholder="Enter The Product ID"/>
                                                    </div>

                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label htmlFor='model name'>Product Name</label>
                                                        <input type="text" className="form-control mt-2" name='modelName' onChange={(e) => setModelName(e.target.value)} value={modelName} placeholder="Enter The Product Name"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' className="btn btn-primary">{id ? "update" : "Submit"}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    </>
  )
}

export default EditRoModule
