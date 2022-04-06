import React from "react"
import { Form, DropdownButton, InputGroup,FormGroup, FormControl, Button} from "react-bootstrap";
import { Dropdown } from "react-bootstrap";


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
        this.props.onSubmit(this.state.term, this.state.filter, this.state.minPrice, this.state.maxPrice);

    }

    // Handles when user clicks any of the dropdown menu
    handleDropDownChange = (event) => {
        //Chnage the text to what is selected
        this.setState({
            dropDownValue: event.target.textContent,
            isPriceSelected: false,
        });

        if(event.target.textContent === "Category"){
            this.setState({
                filter: "searchCategory",
            });
        }else if(event.target.textContent  === "Title"){
            this.setState({
                filter: "searchTitle",
            });
        }else if(event.target.textContent  === "Author"){
            this.setState({
                filter: "searchAuthor",
            });
        }else if(event.target.textContent === "Price"){
            this.setState({
                filter:"searchPrice",
                isPriceSelected:true,
            });
        }
    }

    handlePriceSubmit = (event) => {
        this.setState({
            isPriceSelected: false,
        })
        this.props.onSubmit(this.state.term, this.state.filter, this.state.minPrice, this.state.maxPrice);
        //Once submitted reset the values to 0
        this.setState({
            minPrice: 0,
            maxPrice: 0
        })
    }

    //These functions handle the min price and max price
    // handleMinPrice = (event) => {
    //     this.setState({
    //         minPrice: event.target.value
    //     })
    // }
    //
    // handleMaxPrice = (event) => {
    //     this.setState({
    //         maxPrice: event.target.value
    //     })
    // }

    //If user selects free books
    handleFreeBooks = (event) => {
        this.setState({
            filter: "searchFree",
            minPrice: 0,
            maxPrice: 0,
        })

    }

    render() {
        const isPriceSelected = this.state.isPriceSelected;
        let priceRange;
        if(isPriceSelected)(
            priceRange =
            <div className="search-card">
                <Form className="d-flex" style={{display: 'inline-block'}}>
                    {/*<FormGroup controlId="formInlineMin">*/}
                    {/*    <FormLabel>Min Price</FormLabel>{' '}*/}
                    {/*    <FormControl*/}
                    {/*        type="number"*/}
                    {/*        min = {0}*/}
                    {/*        placeholder="0"*/}
                    {/*        value={this.state.minPrice}*/}
                    {/*        onChange={this.handleMinPrice}/>*/}
                    {/*</FormGroup>{' '}*/}
                    {/*-*/}
                    {/*<FormGroup controlId="formInlineMax">*/}
                    {/*    <FormLabel>Max Price</FormLabel>{' '}*/}
                    {/*    <FormControl*/}
                    {/*        type="number"*/}
                    {/*        placeholder="500"*/}
                    {/*        value={this.state.maxPrice}*/}
                    {/*        onChange={this.handleMaxPrice}/>*/}
                    {/*</FormGroup>{' '}*/}

                    <Form.Check
                        className="big-checkbox"
                        type = "checkbox"
                        id = "default-checkbox"
                        label = "Free books"
                        onChange={this.handleFreeBooks}
                    />
                </Form>

                <Button className="submit-button" style={{margin: '1.5rem'}} size="md" type="input" onClick={this.handlePriceSubmit} title="filterSearchButton">Set price range</Button>

            </div>

        )

        return(
           <div className="ui segment" style={{padding: '2rem', marginBottom: "20px"}}>
                <Form onSubmit={this.handleFormSubmit} >
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                size="lg"
                                type="text"
                                placeholder="Search books..."
                                value={this.state.term}
                                onChange={e => this.setState({ term: e.target.value})}
                            />
                            <DropdownButton
                                size="lg"
                                variant="dark"
                                componentClass={InputGroup.Button}
                                id="input-dropdown-addon"
                                className="dropDownButton"
                                title={this.state.dropDownValue}
                            >

                                <Dropdown.ItemText>Filter by</Dropdown.ItemText>
                                <Dropdown.Divider />
                                <Dropdown.Item as="button"><div onClick={this.handleDropDownChange} title="selectionFilterButton">Category</div></Dropdown.Item>
                                <Dropdown.Item as="button"><div onClick={this.handleDropDownChange}>Title</div></Dropdown.Item>
                                <Dropdown.Item as="button"><div onClick={this.handleDropDownChange}>Author</div></Dropdown.Item>
                                <Dropdown.Item as="button"><div onClick={this.handleDropDownChange}>Price</div></Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </FormGroup>
                </Form>

                <div>
                    {priceRange}
                </div>
           </div>



        );
    }
}

export default SearchBar;

