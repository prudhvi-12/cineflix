
/*
For Pagination use Material UI 
It gives the direct pagination component and any changes can be directly accessed using 
target.textContent
these changes huld be refleted in main page contentsby changing page={given} in the url
*/

import React, { Component } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import '../css/styling.css';


class Page extends Component{
    onChange=(e)=>{
           const val=e.currentTarget.textContent;
           const {changepage}=this.props;
           changepage(val);
    }
    render() { 
        return ( 
        <Pagination  style={{display:'inline-block' , marginBottom:'15px'}} count={this.props.totalpages} onChange={this.onChange}variant="outlined" color="primary" />
         );
    }
}
 
export default Page;