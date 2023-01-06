import React from 'react'
import { Navbar, NavbarBrand } from 'reactstrap'

function AppHeader() {
    return <>
        <Navbar className='my-2' color='dark' dark>
            <NavbarBrand>
                Zomato Project
            </NavbarBrand>
        </Navbar>
    </>
}

export default AppHeader