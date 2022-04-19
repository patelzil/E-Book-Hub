import {render, waitForElementToBeRemoved} from "@testing-library/react";
import Books from "../../components/books.component";
import NavBar from "../../components/navbar.component";
import { BrowserRouter } from 'react-router-dom';

describe('Book Homepage Component tests', () =>
{
    // test('Render standard component', async () =>
    // {
    //     const { queryByTitle } = render(<BrowserRouter><Books /></BrowserRouter>);
    //
    //     const bookComp = queryByTitle("Search results...");
    //     expect(bookComp).toBeTruthy();
    // })

})

describe('Book Homepage Navbar tests', () =>
{
    test('Render standard component', async () =>
    {
        const { queryByTitle } = render(<BrowserRouter><NavBar /></BrowserRouter>);

        const bookNavbar = queryByTitle("bookNavbar");
        expect(bookNavbar).toBeTruthy();
    })

})
