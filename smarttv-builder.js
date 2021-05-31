require('dotenv').config();
const axios = require('axios')
const fs = require("fs")
const zipFolder = require('zip-folder');
const FormData = require('form-data')

const uploadZip = () => {

  let body = new FormData()

  body.append('dist',fs.createReadStream(`./${process.env.ZIP_FOLDER}`));
  body.append('ApplicationId',process.env.APPLICATION_ID);
  body.append('DeviceType',2);
  
  let headers = {
    headers : {
      ...body.getHeaders()
    }
  }

  return axios.post(`${process.env.SERVER_URL}/upload-dist`,body,headers)

}

const runApplication = () => {

  let body = {
    ApplicationId : parseInt(process.env.APPLICATION_ID),
    DeviceId :  parseInt(process.env.DEVICE_ID),
    CommandName : "execute"
  }

  axios.post(`${process.env.SERVER_URL}/run-command`,body).then(res => printResponse(res.data)).catch(err => console.log(err));

}

const printResponse = (response) => {
  response.Data.map(el => console.log(el.CommandResult));
} 

const doneHookCallback = () => {

  fs.rename(`./${process.env.OUTPUT_FOLDER}/${process.env.ENTRY_FOLDER}/${process.env.ENTRY_FILE}`,`./${process.env.OUTPUT_FOLDER}/${process.env.ENTRY_FILE}`,(err) => err && console.log("Something went wrong! Move index.html",err));

  zipFolder(`./${process.env.OUTPUT_FOLDER}`, `${__dirname}/${process.env.ZIP_FOLDER}`, (err) => {
    
    if(err) {
      console.log("Error",err);
    } else {
      uploadZip().then((res) => runApplication());
    }

  });
}

exports.doneHookCallback = doneHookCallback;