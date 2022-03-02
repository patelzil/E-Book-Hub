import {render, fireEvent} from "@testing-library/react";
import SignIn from "../../../components/signup.component";

describe('Signup Component tests', () =>
{
    test('Render standard component --> Buttons', () =>
    {
        const { queryByTitle } = render(<SignIn />);
        
        const registerbtn = queryByTitle("registerButton");
        expect(registerbtn).toBeTruthy();
    })

    test('Render standard component --> Form firstname', () =>
    {
        const { queryByTitle } = render(<SignIn />);

        const firstName = queryByTitle("firstName");
        expect(firstName).toBeTruthy();
        
    })

    test('Render standard component --> Form lastName',() =>
    {
        const { queryByTitle } = render(<SignIn />);
        const lastName = queryByTitle("lastName");
        expect(lastName).toBeTruthy();
    })

    test('Render standard component --> Form email',() =>
    {
        const { queryByTitle } = render(<SignIn />);
        const email = queryByTitle("email");
        expect(email).toBeTruthy();
    })

    test('Render standard component --> Form userName',() =>
    {
        const { queryByTitle } = render(<SignIn />);
        const username = queryByTitle("userName");
        expect(username).toBeTruthy();
    })

    test('Render standard component --> Form password',() =>
    {
        const { queryByTitle } = render(<SignIn />);
        const password = queryByTitle("password");
        expect(password).toBeTruthy();
    })

    test('Render standard component --> Form re-password',() =>
    {
        const { queryByTitle } = render(<SignIn />);
        const rePassword = queryByTitle("re-Password");
        expect(rePassword).toBeTruthy();
    })

})