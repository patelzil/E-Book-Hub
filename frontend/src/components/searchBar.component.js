import React from "react"
import { Form, InputGroup,FormGroup, FormControl} from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state =  {
            term: '',
            filter: '',
            dropDownValue:"Filter ",
            isPriceSelected: false,
            minPrice: 0,
            maxPrice: 0,
        }
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term,this.state.minPrice, this.state.maxPrice);
    }

    render() {
        return(
           <div className="ui segment" style={{padding: '2rem'}}>
                <Form onSubmit={this.handleFormSubmit} >
                    <FormGroup>
                        <InputGroup>
                        <InputGroup.Text style={{padding:'20px'}}> <SearchIcon /> </InputGroup.Text>
                            <FormControl
                                size="lg"
                                type="text"
                                placeholder="Filter first and press enter to search"
                                value={this.state.term}
                                onChange={e => this.setState({ term: e.target.value})}
                            />
                        </InputGroup>
                    </FormGroup>
                </Form>
           </div>
        );
    }
}

export default SearchBar;

