import React from "react";
import logo from '../imgs/logo-no-background.png'
import '../css/Header.css'
import LogoutButton from './Logout';
import { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import "bootstrap/dist/css/bootstrap.min.css"


function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'><img src={logo} className="logo"/></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
    
            <MDBNavbarItem>
              <MDBNavbarLink href='/mycollections'>My Collections</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/favorites'>Favorites</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/newrelease'>New Release</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/search'>Search</MDBNavbarLink>
            </MDBNavbarItem>
            
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                 Support
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/request">Request</MDBDropdownItem>
                  <MDBDropdownItem link>FaQ</MDBDropdownItem>
                  <MDBDropdownItem link>Contect</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
             
            <MDBNavbarItem className="ms-auto">
            </MDBNavbarItem>
            
            <MDBNavbarItem className="d-flex">
              <MDBNavbarLink href='/profile'>Profile</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className="d-flex">
            <LogoutButton/>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;