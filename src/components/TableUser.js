
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from'../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './modalAddNew';
import ModalEditUser from './modalEditUser';
import ModalConfirm from './modalConfirm';
import './TableUser.scss'
import  _ from"lodash";
const Tableusers = (props) => {
    const[listUsers,setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const[totalPages,setTotalPages] = useState(0);

    const[isShowModalAddNew,setIsShowModalAddNew] = useState(false);

    const[isShowEdit,setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    //sort dữ liệu
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id")

    //filter dữ liệu
    const [keyWord, setKeyWork] = useState("");

    const handleClose = () => {
      setIsShowModalAddNew(false);
      setIsShowModalEdit(false);
      setIsShowModalDelete(false);
    }
    const handleUpdateTable = (user) => {
        setListUsers([user,...listUsers])
    }
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }
    const handleEditUserModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        setListUsers(cloneListUser);

    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    }

    //hàm cloneListUser = _.cloneDeep(listUsers) sử dụng thư vien Lodash
    //Việc này đảm bảo rằng chúng ta không thay đổi trực tiếp danh sách ban đầu mà làm việc trên một bản sao của nó.
    const handleDeleteFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        // sử dụng phương thức filter để lọc ra các phần tử trong cloneListUser mà có id khác với id của user. 
        //Điều này có nghĩa là chúng ta loại bỏ user khỏi danh sách.
        cloneListUser = cloneListUser.filter(item => item.id !== user.id);
        setListUsers(cloneListUser); //cập nhật danh sách ng dùng
    }

    //onclick cho icon sort
    const handlSort =(sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
        setListUsers(cloneListUser); //cập nhật danh sách ng dùng
    }
    
    useEffect(() => {
        //call api
        getUsers(1);

    }, [])
    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if(res && res.data) {
        console.log(res)
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages)
        }
    }
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    }

    //cho filter ô input
    const handleSearch = (event) => { // event của html
        let term = event.target.value;
        if(term) {

        } else {
            //getUsers(1);
        }
    }
    return (<>
            <div className='my-3 add-new'>
          <span> <b>List User:</b></span>
          <button className="btn btn-success" 
          onClick={()=>setIsShowModalAddNew(true)}> Add new user</button>
        </div>

        {/* ô input để filter */}
        <div className='col-4 my-3'> 
            <input 
            className='form-control' 
            placeholder='Search user by email....'
            //value={keyword}
            onChange={(event)  => handleSearch(event)}
            />
        </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <div className="sort-header">
            <span>ID</span>
            <span>
            {/* desc là sort theo giảm dần, asc tăng dân */}
            <i class="fa-solid fa-arrow-down-long" onClick={()=> handlSort("desc", "id")}></i> 
            <i class="fa-solid fa-arrow-up-long" onClick={()=> handlSort("asc", "id")}></i>
                </span>
            </div>
            
          </th>

          <th>Email</th>

          <th> 
          <div  className="sort-header">
          <span>FirsName</span>
          <span>
          <i class="fa-solid fa-arrow-down-long" onClick={()=> handlSort("desc", "first_name")}></i> 
            <i class="fa-solid fa-arrow-up-long" onClick={()=> handlSort("asc", "first_name")}></i>
            </span>
          </div>
          
          </th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && 
            listUsers.map((item,index) => {
                return (
                <tr key ={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                        <button 
                        className='btn btn-warning mx-3'
                        onClick={()=> handleEditUser(item)}
                        >Edit</button>
                        <button className='btn btn-danger'
                                onClick={() => handleDeleteUser(item)}
                        >Delete </button>
                    </td>
                </tr>
                )
            })
        }
        
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
           <ModalAddNew show={isShowModalAddNew}
     handleClose={handleClose}
     handleUpdateTable={handleUpdateTable}/>
     <ModalEditUser
        show={isShowEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserModal={handleEditUserModal}
     />
     <ModalConfirm show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteFromModal = {handleDeleteFromModal}/>
    </>)
}
export default Tableusers;