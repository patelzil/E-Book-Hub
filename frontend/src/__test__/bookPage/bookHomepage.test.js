import {render, waitForElementToBeRemoved} from "@testing-library/react";
import Books from "../../components/books.component";
import NavBar from "../../components/navbar.component";
import { BrowserRouter } from 'react-router-dom';
import SearchPageComponent from "../../components/searchPage.component";
import SearchBar from "../../components/searchBar.component";

describe('Book Homepage Component tests', () =>
{
    test('Render standard component', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><Books /></BrowserRouter>);
        
        const bookComp = queryByTitle("bookComponent");
        expect(bookComp).toBeTruthy();
    })

})

describe('Book Homepage Navbar tests', () =>
{
    test('Render standard component', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><NavBar /></BrowserRouter>);
        
        const bookNavbar = queryByTitle("bookNavbar");
        expect(bookNavbar).toBeTruthy();
    })

})



// describe('Book Homepage Search Component tests', () =>
// {
//     test('Render standard component', () =>
//     {
//         const { queryByTitle } = render(<BrowserRouter><SearchPageComponent /></BrowserRouter>);
        
//         const requestPage = queryByTitle("searchRequestPage");
//         expect(requestPage).toBeTruthy();
//     })

//     test('Render standard component --> list of book', () =>
//     {
//         const { queryByTitle } = render(<BrowserRouter><SearchPageComponent /></BrowserRouter>);
        
//         const listOfBooks = queryByTitle("listOfBooks");
//         expect(listOfBooks).toBeTruthy();
//     })

// })

// describe('Book Homepage Navbar tests', () =>
// {
//     test('Render standard component', () =>
//     {
//         const { queryByTitle } = render(<BrowserRouter><SearchBar /></BrowserRouter>);
        
//         const bookNavbar = queryByTitle("selectionFilterButton");
//         expect(bookNavbar).toBeTruthy();
//     })

// })