// React
import React from 'react';

// Google maps react
import { Map, GoogleApiWrapper } from 'google-maps-react' // https://www.npmjs.com/package/google-maps-react
import { InfoWindow, Marker } from 'google-maps-react' // https://www.npmjs.com/package/google-maps-react

// BOOTSTRAP REACT
// Layout
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Nav
import Nav from 'react-bootstrap/Nav'

//Form
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// Button
import Button from 'react-bootstrap/Button'

// Navbar
import Navbar from 'react-bootstrap/Navbar'

// List
import ListGroup from 'react-bootstrap/ListGroup'

// AXIOS
import axios from 'axios' // https://www.npmjs.com/package/axios

export class MapContainer extends React.PureComponent {
    //   Declare states
    state = {
        coffees: [],
        filteredCoffees: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        query: ''
    }

    //  After components mounted

    componentDidMount() {
        this.getCoffees()
    }

    //  Getting Foursquare data

    getCoffees = () => {
        const endPoint = "https://api.foursquare.com/v2/venues/explore?"
        const parameters = {
            client_id: "HJFSLZHJ5WUIKOZEPMIFRQDF4MYABYRVDKYTYAU5WZ13M4BW",
            client_secret: "T5LGNMCPT3IEEJIU5YOAGBDQNNBBICFU0YQYPHTPXLLCBMD5",
            query: "coffee",
            near: "Shibuya",
            v: "20180323"
        }

        return (axios.get(endPoint + new URLSearchParams(parameters))
            .then(response => {
                this.setState({
                    coffees: response.data.response.groups[0].items,
                    filteredCoffees: response.data.response.groups[0].items
                });
            })
            .catch(error => {
                console.log(error)
            })
        )
    }

    // Search
    changeFilteredCoffees = (coffeeShops) => {
        this.setState({ filteredCoffees: coffeeShops })
    }

    filterCoffees = (i) => {
        let val = this.state.coffees.filter(SingleVenue => SingleVenue.venue.name.toLowerCase().includes(i))
        this.changeFilteredCoffees(val)
    }

    //  Click events 

    //  Marker
    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    //  Map
    onMapClicked = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    // Item click 
    onItemClick = (i) => {
        //let itemMarker = document.getElementById('piripo')
        console.log(i)
        console.log(this.state.coffees)
       //console.log(this.state.activeMarker)
       let active = this.state.activeMarker

      if(active.coffeeName === i) {
          console.log('pipipi')
         
      }
    }

    render() {

        return (
            <Container fluid>
                <Row>
                    <Navbar fixed='top' variant="dark" style={{
                        backgroundColor: '#CCC049'
                    }}>
                        <Navbar.Brand>
                            NeighbourHood Map: Shibuya Coffee Shops
                        </Navbar.Brand>
                    </Navbar>
                </Row>
                <Row as='main'>
                    <Col style={{ padding: 0, paddingTop: 55, overflow: 'scroll', maxHeight: '100vh', minHeight: '100vh' }} xs={3} sm={3} md={3} lg={3}>
                        <Nav>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="Coffee shop search"
                                    aria-describedby="basic-addon2"
                                    onChange={(event) => this.filterCoffees(event.target.value)}
                                />
                                <InputGroup.Append>
                                    <Button style={{ backgroundColor:'rgb(180,170,54)', border: '0', color: '#fff'}} >Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ListGroup variant="flush">
                                {
                                    this.state.filteredCoffees.map((Singlevenue) => (
                                        <ListGroup.Item as='button' style={{ color: 'rgb(180,170,54)'}} key={Singlevenue.referralId} onClick={() => this.onItemClick(Singlevenue.venue.name)}>
                                            {Singlevenue.venue.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Nav>
                    </Col>
                    <Col style={{ padding: 0, paddingTop: 52, maxHeight: '91vh' }} xs={9} sm={9} md={9} lg={9}>
                        <Map
                            onReady={this.initMarkers}
                            google={this.props.google}
                            onClick={this.onMapClicked}
                            styles={[
                                {
                                    "featureType": "landscape",
                                    "elementType": "all",
                                    // Style from Snazzy Maps
                                    "stylers": [
                                        {
                                            "hue": "#FF007B"
                                        },
                                        {
                                            "saturation": 59.80000000000001
                                        },
                                        {
                                            "lightness": 21
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "hue": "#FF00AF"
                                        },
                                        {
                                            "saturation": 32.599999999999994
                                        },
                                        {
                                            "lightness": 20.599999999999994
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.highway",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "hue": "#FFAF00"
                                        },
                                        {
                                            "lightness": 50.80000000000001
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.arterial",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "hue": "#FFE800"
                                        },
                                        {
                                            "lightness": 8.600000000000009
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "road.local",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "hue": "#FFD900"
                                        },
                                        {
                                            "saturation": 44.79999999999998
                                        },
                                        {
                                            "lightness": 3.6000000000000085
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": [
                                        {
                                            "hue": "#0078FF"
                                        },
                                        {
                                            "saturation": 24.200000000000003
                                        },
                                        {
                                            "gamma": 1
                                        }
                                    ]
                                }
                            ]}
                            zoom={12}
                            initialCenter={{
                                lat: 35.6706568,
                                lng: 139.723368
                            }}>

                            {this.state.filteredCoffees.map((SingleVenue) =>
                                //  Markers
                                <Marker
                                    onClick={this.onMarkerClick.bind(this)}
                                    animation={(this.state.activeMarker === SingleVenue.title) && this.props.google.maps.Animation.BOUNCE}
                                    key={SingleVenue.referralId}
                                    position={{
                                        lat: SingleVenue.venue.location.lat,
                                        lng: SingleVenue.venue.location.lng
                                    }}
                                    coffeeAddress={SingleVenue.venue.location.address}
                                    coffeeName={SingleVenue.venue.name}
                                    coffeeType={SingleVenue.venue.categories[0].name}
                                    icon={{
                                        url: "http://maps.google.com/mapfiles/ms/icons/pink-pushpin.png"
                                    }}
                                />
                            )}
                            {/* Info Windows */}
                            {<InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}>
                                <div>
                                    <h2>{this.state.selectedPlace.coffeeName}</h2>
                                    <h4> {this.state.selectedPlace.coffeeType}
                                        <br></br>
                                        Address: {this.state.selectedPlace.coffeeAddress}
                                    </h4>
                                </div>
                            </InfoWindow>}
                        </Map>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCdcTqQ7oTxSiZjCpW9q_t31l9gPbeStvQ'
})(MapContainer);