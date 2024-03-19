import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {putUpadateUser} from '../services/UserService';
import {toast} from'react-toastify';
const ModalEditUser = (props) => {
   const {show, handleClose,dataUserEdit,handleEditUserModal,handleUpdateTable} = props;
   const[name, setName] = useState("");
   const[job, setJob] = useState("");
   
   const handleEditUser = async() => {
       let res = await putUpadateUser(name, job);
       
       if (res || res.name || res.job) {
        handleEditUserModal({
            first_name: name,
            id: dataUserEdit.id
        });
        handleClose();
        toast.success("Update User Succeed!");
       }else {
        toast.error("error delete user")}
   }
   useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
   }, [dataUserEdit])
    return (
        <>
      <Modal show={show} onHide={handleClose}
            backdrop="static"
            keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" 
                    value={name} 
                    onChange={(event) =>setName(event.target.value)}/>
                    </div>
                <div className="form-group">
                    <label className="form-label">Job</label>
                    <input type="text" className="form-control" 
                    value={job} 
                    onChange={(event) =>setJob(event.target.value)}/>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick= {()=> handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default ModalEditUser;

