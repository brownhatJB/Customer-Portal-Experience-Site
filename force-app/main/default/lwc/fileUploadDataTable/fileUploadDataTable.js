/**
 * @module             : Real_Estate_Module
 * @description        : LWC component used to modify lightning data table to give lookup functionality
 * @namespace          :
 * @author             : SREERAM.R
 * @group              : Document Checklist
 * @last modified on   : 05-27-2024
 * @last modified by   : SREERAM.R
 **/
// importing LightningDatatable from slds and makes it available for use in LWC
import LightningDatatable from "lightning/datatable";

//import HTML file to LWC
import documentUploadRender from "./documentUploadRender.html";

export default class FileUploadDataTable extends LightningDatatable {
  //initializing custom type for data table
  static customTypes = {
    fileUpload: {
      template: documentUploadRender,
      typeAttributes: ["acceptedFileFormats", "fileUploaded"]
    }
  };
}