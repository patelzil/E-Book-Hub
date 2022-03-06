import {render} from "@testing-library/react";
import SignIn from "../../../components/signup.component";
import SignInNav from "../../../components/signupnavbar.component";
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

    test('Render standard component --> Form lastName',async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const lastName = queryByTitle("lastName");
        expect(lastName).toBeTruthy();
    })

    test('Render standard component --> Form email', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const email = queryByTitle("email");
        expect(email).toBeTruthy();
    })

    test('Render standard component --> Form userName', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const username = queryByTitle("userName");
        expect(username).toBeTruthy();
    })

    test('Render standard component --> Form password', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const password = queryByTitle("password");
        expect(password).toBeTruthy();
    })

    test('Render standard component --> Form re-password', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignIn /></BrowserRouter>);
        const rePassword = queryByTitle("re-Password");
        expect(rePassword).toBeTruthy();
    })

})

describe('Sigup page Navbar test', () =>
{
    test('Render standard component --> Navbar', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><SignInNav /></BrowserRouter>);
        
        const registerbtn = queryByTitle("signUpNavbar");
        expect(registerbtn).toBeTruthy();
    })
})