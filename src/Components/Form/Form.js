// import React, { useState } from "react";
// import { connect } from "react-redux";
// import axios from "axios";
// import Dropzone from "react-dropzone";
// import { v4 as randomString } from "uuid";

// function Form(props) {
//   const [isUploading, setIsUploading] = useState(false),
//     [url, setUrl] = useState("hhtp://via.placeholder.com/450x450");

//   const getSignedRequest = ([file]) => {
//     setIsUploading(true);

//     const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

//     axios
//       .get("/api/signs3", {
//         params: {
//           "file-name": fileName,
//           "file-type": file.type,
//         },
//       })
//       .then((response) => {
//         const { signedRequest, url } = response.data;
//         this.uploadFile(file, signedRequest, url);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const uploadFile = (file, signedRequest, url) => {
//     const options = {
//       headers: {
//         "Content-Type": file.type,
//       },
//     };

//     axios.put(signedRequest, file, options)
//     .then(response => {
//       setIsUploading(false)
//     });
//     if (err.response.status === 403) {
//       alert(
//         `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
//           err.stack
//         }`
//       );
//     }
    

//   return <div></div>;
// }
// const mapStateToProps = (reduxState) => {
//   const { is_admin } = reduxState.customer;
//   return {
//     is_admin,
//   };
// };

// export default connect(mapStateToProps)(Form);
