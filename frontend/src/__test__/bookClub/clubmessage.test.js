import {render, cleanup} from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import Message from '../../components/message.component';

afterEach(cleanup);

describe('Chat room Component tests', () =>
{
    test('Render standard component for chat room', async () =>
    {
        const result = '{"username":"TestUser","password":"Test123@$","eMail":"Test@gmail.com","firstname":"Test","lastname":"User"}';
        await localStorage.setItem("userObject",JSON.stringify(result));
        
        const { getByTestId } = render(<BrowserRouter><Message /></BrowserRouter>);
        const senderName = getByTestId("senderName");
        expect(senderName).toBeTruthy();
        const chat = getByTestId("chatWindow");
        expect(chat).toBeTruthy();
        await localStorage.removeItem("userObject")   //may causer problem later, if so change it here
    })
})