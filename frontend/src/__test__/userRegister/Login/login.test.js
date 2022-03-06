import {render} from "@testing-library/react";
import LogIn from "../../../components/login.component";
import LoginNavBar from "../../../components/loginnavbar.component";
import { BrowserRouter } from 'react-router-dom';

describe('Login Component tests', () =>
{
    test('Render standard component --> Buttons', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><LogIn /></BrowserRouter>);
        
        const loginbtn = queryByTitle("logInButton");
        expect(loginbtn).toBeTruthy();
        
        const forgotbtn = queryByTitle("forgotPassword");
        expect(forgotbtn).toBeTruthy();
    })

    test('Render standard component --> input fields', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><LogIn /></BrowserRouter>);
        
        const userName = queryByTitle("userName");
        expect(userName).toBeTruthy();
        const password = queryByTitle("password");
        expect(password).toBeTruthy();
    })
})

describe('Login Navbar Component tests', () =>
{
    test('Render standard component --> Navbar', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><LoginNavBar /></BrowserRouter>);
        
        const loginbtn = queryByTitle("logInNavbar");
        expect(loginbtn).toBeTruthy();
        
    })
})