// import React, { Component } from 'react'
// import {
//     Box, Title, Field, Media, Control, Input,
//     MediaContent, Subtitle, Button, Columns,
//     Column, Card, CardContent, Container, Notification, Delete
// } from 'bloomer';
// import withRouter from '../../../node_modules/react-router-dom/withRouter';
// import $ from 'jquery'

// class SearchResults extends Component {

//     constructor(props){
//         super(props);
//         this.state = this.props.state;
//     }

//     render() {
//         //console.log(this.state.hideResult);
//         return (
//             <Container>
//                 <Box>
//                     <Title>Results</Title>
//                 </Box>
//                 <Box>
//                     <Columns>
//                         <Column isSize={8} isOffset={2}>
//                             <Card>
//                                 <CardContent>
//                                     {this.state.searchResults.map(searchResult => {
//                                         return (
//                                             <Media>

//                                                 {/* <MediaLeft>
//                                                             <Image isSize='48x48' src='https://via.placeholder.com/96x96' />
//                                                         </MediaLeft> */}
//                                                 <MediaContent>
//                                                     <Title isSize={4}>{`${searchResult.productName}`}</Title>
//                                                     <Subtitle isSize={6}><b>Details:</b> {searchResult.details}</Subtitle>
//                                                     <Subtitle isSize={6}><b>Quantity:</b> {searchResult.stock}</Subtitle>
//                                                 </MediaContent>
//                                             </Media>
//                                         )
//                                     })}
//                                 </CardContent>
//                             </Card>
//                         </Column>
//                     </Columns>
//                 </Box>
//             </Container>
//         )
//     }
// }

// export default withRouter(SearchResults)