import React ,{useEffect} from "react";
import {Link} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {Row,Col,Image,ListGroup,Card,Button} from "react-bootstrap";
import Loader from "../Components/loader";
import Message from "../Components/Message";
import Rating from "../Components/Rating";
import { useParams } from "react-router-dom";
import { ListProductDetails } from "../Actions/ProductActions";

const ProductScreen=()=>{
    const dispatch=useDispatch();
    const productDetails=useSelector((state)=>state.productDetails)
    const{loading,error,product}=productDetails;
   const {_id}=useParams();

  
useEffect(()=>{
dispatch(ListProductDetails(_id))
},[dispatch,_id]);
  

return(
    <>
    <Link className="btn btn-light" to="/">Go Back</Link>
    {loading?(<Loader></Loader>):error?<Message variant='danger'>{error}</Message>:
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        <ListGroup  variant='flush'>
         <ListGroup.Item>
             <h2>{product.name}</h2>
         </ListGroup.Item>
         <ListGroup.Item>
             <Rating val={product.rating} text={` ${product.numReviews} Reviews`}></Rating>
         </ListGroup.Item>
         <ListGroup.Item>price:${product.price}</ListGroup.Item>
         <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card >
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>status:</Col>
                        <Col>
                        {product.countInStock>0?"In stock":"out of stock"}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
                <Button className="btn-block"type="button"disabled={product.countInStock===0} >
                    Add to Cart
                    </Button>
            </ListGroup.Item>
        </Card>
        </Col>
    </Row>
}
    </>
);

}
export default ProductScreen;