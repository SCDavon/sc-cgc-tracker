import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'
import _ from 'lodash';
import CGCCard from './CGCCard';
import { Accordion } from 'react-bootstrap'

class CGCPage extends Component {


	static propTypes = {
		data: React.PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			CGC: React.PropTypes.object
		}).isRequired,
	};

	state = {
		CGCCards: [],
	};

	render() {

		if (this.props.data.loading){
			return (<div>Loading</div>)
		}

		if (this.props.data.error){
			console.log(this.props.data.error);
			return (<div>An error has occurred while grabbing CGC Request data</div>)
		}

		console.log(this.props.data.viewer.allCgcs.edges);
		const raw = this.props.data.viewer.allCgcs.edges;
		let cgcDataObjects = _.map(raw, (item) => item.node);

		this.state.CGCCards = [];
		for (let i = 0; i < cgcDataObjects.length; i++) {
			let curObject = cgcDataObjects[i];
			this.state.CGCCards.push(<CGCCard data={curObject}/>)
		}


		return (
			<div className="App">
				<div style={{maxWidth: "750px", margin: "0 auto"}}>
					<Accordion>
						{this.state.CGCCards}
					</Accordion>
				</div>
			</div>
		);
	}
}

const CGCQuery = gql`
  query CGCQuery {
    viewer {
      allCgcs {
        edges {
          node {
            id
            user {
              id
              username
            }
            iteration {
              edges {
                node {
                  id
                  internalNotes
                  clipFeedback
                  iterationCount
                }
              }
            }
            status
            payment
            paymentStatus
            cgcRequest {
              id
              clipId
            }
          }
        }
      }
    }
  }
`;

const CGCPageWithData = graphql(CGCQuery)(withRouter(CGCPage));


export default CGCPageWithData;
