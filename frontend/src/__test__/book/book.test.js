import {render} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import BookCard from '../../components/bookCard.component'

describe('Homepage Component tests', () =>
{

    test('Render standard component --> Cards', () =>
    {
        const { queryByTitle } = render(<BrowserRouter><BookCard /></BrowserRouter>);
        const cardCreated = queryByTitle("bookCard");
        expect(cardCreated).toBeTruthy();
    })
})