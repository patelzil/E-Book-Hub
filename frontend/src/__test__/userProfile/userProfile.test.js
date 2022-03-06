import {render} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import User from '../../components/user.component';
import UserProfile from '../../components/userprofile.component';
import UserSessionNavBar from '../../components/usersessionnavbar.component';

describe('User Component tests', () =>
{
    test('Render standard component --> Dashbaord',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><User /></BrowserRouter>);
        const dashBoard = queryByTitle("userDashboard");
        expect(dashBoard).toBeTruthy();
    })
})

describe('User profile Component tests', () =>
{
    test('Render standard component --> Error page',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const errorPage = queryByTitle("erroPageUserProfile");
        expect(errorPage).toBeFalsy();
    })

    test('Render standard component --> Edit button',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editButton = queryByTitle("editButtonUserProfile");
        expect(editButton).toBeTruthy();
    })

    test('Render standard component --> Edit Form',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editProfile = queryByTitle("editProfileForm");
        expect(editProfile).toBeTruthy();
    })

    test('Render standard component --> Edit Fields',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editField = queryByTitle("firstName");
        expect(editField).toBeTruthy();
    })

    test('Render standard component --> Edit Fields',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editField = queryByTitle("lastName");
        expect(editField).toBeTruthy();
    })

    test('Render standard component --> Edit Fields',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editField = queryByTitle("email");
        expect(editField).toBeTruthy();
    })

    test('Render standard component --> Edit Fields',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editField = queryByTitle("userName");
        expect(editField).toBeTruthy();
    })

    test('Render standard component --> Edit Fields',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const editField = queryByTitle("password");
        expect(editField).toBeTruthy();
    })

    test('Render standard component --> Password requirnment',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserProfile /></BrowserRouter>);
        const passRequirnment = queryByTitle("passRequirnmentUserProfile");
        expect(passRequirnment).toBeTruthy();
    })


})


describe('User Navbar tests', () =>
{
    test('Render standard component --> Navbar',() =>
    {
        const { queryByTitle } = render(<BrowserRouter><UserSessionNavBar /></BrowserRouter>);
        const navbarUser = queryByTitle("userNavbar");
        expect(navbarUser).toBeTruthy();
    })
})