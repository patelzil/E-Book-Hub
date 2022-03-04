import {render, fireEvent} from "@testing-library/react";
import LogIn from "../../../components/login.component";
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