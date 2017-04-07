import React, {Component} from 'react';
import { Table, ListGroup, ListGroupItem } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'
import _ from 'lodash';



class ExpertPage extends Component {


	static propTypes = {
		data: React.PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			User: React.PropTypes.object
		}).isRequired,
	};

	state = {
		list: [],
	};

	render() {

		if (this.props.data.loading){
			return (<div>Loading</div>)
		}

		if (this.props.data.error){
			console.log(this.props.data.error);
			return (<div>An error has occurred while grabbing CGC Request data</div>)
		}

		const raw = this.props.data.viewer.allUsers.edges;
		console.log(raw);
		let expertDataObjects = _.map(raw, (item) => item.node);

		this.state.list = [];
		for (let i = 0; i < expertDataObjects.length; i++) {
			let id = expertDataObjects[i].id;
			let userName = expertDataObjects[i].username;
			this.state.list.push(<ListGroupItem header={userName}>{id}</ListGroupItem>)
		}

		return (
			<div className="App">
				<div style={{width: "75%", margin: "0 auto"}}>
					<ListGroup>
						{this.state.list}
					</ListGroup>
				</div>

			</div>
		);
	}
}

const ExpertQuery = gql`
  query ExpertQuery {
    viewer {
      allUsers {
        edges {
          node {
            id
            username
            approvedRoles
            lastLogin
          }
        }
      }
    }
  }
	
`;

const ExpertPageWithData = graphql(ExpertQuery)(withRouter(ExpertPage));


export default ExpertPageWithData;
