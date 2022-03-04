import {render, fireEvent} from "@testing-library/react";
import SignIn from "../../../components/signup.component";
import { BrowserRouter } from 'react-router-dom';


describe('Signup Component tests', () =>
{
    test('Render standard component --> Buttons', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        
        const registerbtn = queryByTitle("registerButton");
        expect(registerbtn).toBeTruthy();
    })

    test('Render standard component --> Form firstname', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);

        const firstName = queryByTitle("firstName");
        expect(firstName).toBeTruthy();
        
    })

    test('Render standard component --> Form lastName',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const lastName = queryByTitle("lastName");
        expect(lastName).toBeTruthy();
    })

    test('Render standard component --> Form email',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const email = queryByTitle("email");
        expect(email).toBeTruthy();
    })

    test('Render standard component --> Form userName',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const username = queryByTitle("userName");
        expect(username).toBeTruthy();
    })

    test('Render standard component --> Form password',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const password = queryByTitle("password");
        expect(password).toBeTruthy();
    })

    test('Render standard component --> Form re-password',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const rePassword = queryByTitle("re-Password");
        expect(rePassword).toBeTruthy();
    })

})