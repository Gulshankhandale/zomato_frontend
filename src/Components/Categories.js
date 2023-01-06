import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import DataTable from 'react-data-table-component'
import axios from 'axios';

function Categories() {

    const [categoryList, setCategoryList] = useState([]);


    useEffect(() => {
        getAllCategories();
    }, [])


    function getAllCategories() {
        axios.get("http://localhost:5000/fetch-all-categories")
            .then((res) => {
                console.log(res)
                setCategoryList(res.data)
            }).catch((err) => {
                console.log("Something went wrong")
            })
    }

    const columns = [
        {
            name: 'Restaurent ID',
            selector: row => row.restaurent_id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        }
    ]


    return <>
        <Container>
            <Row>
                <Col lg={6}>
                    <DataTable columns={columns} data={categoryList} />
                </Col>
                <Col sm={4}>
                    <Form>
                        <FormGroup>
                            <Label>Restaurent ID</Label>
                            <Input name='restaurent_id' type='text' placeholder='restaurent id' />
                        </FormGroup>
                        <FormGroup>
                            <Label>Category Name</Label>
                            <Input name='name' type='text' placeholder='category name' />
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </>
}

export default Categories