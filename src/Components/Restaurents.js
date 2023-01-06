import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Container, Input, Button, Breadcrumb, Navbar, NavbarBrand, Col, Row, Form, FormGroup, Label, Alert } from 'reactstrap'
import toastr from 'toastr';

function Restaurents() {

    const [restaurentsList, setRestaurentsList] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [start_time, setStartTime] = useState("");
    const [close_time, setCloseTime] = useState("");
    const [category_id, setCategoryId] = useState(0);
    const [fetchedRestaurents, setFetchedRestaurents] = useState([]);



    useEffect(() => {
        getAllRestaurents();
        fetchAllCategories();
    }, [])


    function getAllRestaurents() {

        axios.get("http://localhost:5000/fetch-all-restaurents")
            .then((res) => {
                let data = [];

                res.data.forEach((v, i) => {
                    data[i] = {
                        name: v.name,
                        address: v.address,
                        phone: v.phone,
                        start_time: v.start_time,
                        close_time: v.close_time,
                        actions: (
                            <>
                                <i className='bi bi-pencil-square me-3' style={{ "fontSize": "1rem" }} onClick={() => { handleEdit(v._id) }}></i>
                                <i className='bi bi-trash' style={{ "fontSize": "1rem" }} onClick={() => { handleDelete(v._id) }}></i>
                            </>
                        )
                    }
                });

                setRestaurentsList(data)
            }).catch((err) => {
                console.log("Something went wrong")
            })
    }

    function fetchAllCategories() {
        axios.get("http://localhost:5000/fetch-all-categories")
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log("Something went wrong")
            })
    }


    function handleSubmitData() {

        axios.post("http://localhost:5000/add-restaurents", {
            name,
            category_id,
            address,
            phone,
            start_time,
            close_time

        }).then((res) => {
            console.log(res.data)
            toastr.success(res.data.message, "Success", { progressBar: true })

        }).catch((err) => {
            console.log("Something went wrong")
            toastr.error("Something went wrong")
        })
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Address',
            selector: row => row.address,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
        },
        {
            name: 'Start Time',
            selector: row => row.start_time,
        },
        {
            name: 'Close Time',
            selector: row => row.close_time,
        },
        {
            name: 'Actions',
            selector: row => row.actions,
        },
    ];

    const handleDelete = (id) => {

        axios.delete(`http://localhost:5000/restaurents/delete/${id}`)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log("Something went wrong")
            })

        getAllRestaurents();
    }

    const handleEdit = (edit_id) => {

        axios.get(`http://localhost:5000/restaurents/${edit_id}`)
            .then((res) => {
                setFetchedRestaurents(res.data)
            })
            .catch((err) => {
                console.log({ message: "Something went wrong" })
            })
    }


    document.title = "Zomato | Restaurents"

    return <>

        <Container>


            <Row>
                <Col lg={8}>
                    <DataTable columns={columns} data={restaurentsList} />
                </Col>


                <Col sm={4}>
                    <Form>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input name='name' placeholder='Restaurent Name' type='text' onChange={(e) => { setName(e.target.value) }} defaultValue={fetchedRestaurents.name} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Category ID</Label>
                            <Input name='category_id' type='select' placeholder='Select Category' onChange={(e) => { setCategoryId(e.target.value) }} defaultValue={fetchedRestaurents.category_id}>
                                <option>None</option>
                                <option value={1}>Cat 1</option>
                                <option value={2}>Cat 2</option>
                                <option value={3}>Cat 3</option>
                                <option value={4}>Cat 4</option>
                                <option value={5}>Cat 5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input name='address' type='text' placeholder='Enter Address' onChange={(e) => { setAddress(e.target.value) }} defaultValue={fetchedRestaurents.address} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Phone No.</Label>
                            <Input name='phone' type='text' placeholder='Enter Phone No' onChange={(e) => { setPhone(e.target.value) }} defaultValue={fetchedRestaurents.phone} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Start Time</Label>
                            <Input name='start_time' type='text' placeholder='Enter Start Time' onChange={(e) => { setStartTime(e.target.value) }} defaultValue={fetchedRestaurents.start_time} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Close Time</Label>
                            <Input name='close_time' type='text' placeholder='Enter Close Time' onChange={(e) => { setCloseTime(e.target.value) }} defaultValue={fetchedRestaurents.close_time} />
                        </FormGroup>
                        <Button className='mb-3' onClick={handleSubmitData}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Restaurents;