import React, {Component} from 'react';
import {Table} from 'react-bootstrap'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { filter } from 'graphql-anywhere'
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class CGCRequestPage extends Component {


	static propTypes = {
		data: React.PropTypes.shape({
			loading: React.PropTypes.bool,
			error: React.PropTypes.object,
			CGCRequest: React.PropTypes.object
		}).isRequired,
	};

	state = {
		headers: [],
		rows: [],
	};

	render() {

		if (this.props.data.loading){
			return (<div>Loading</div>)
		}

		if (this.props.data.error){
			console.log(this.props.data.error);
			return (<div>An error has occurred while grabbing CGC Request data</div>)
		}

		const raw = this.props.data.viewer.allCgcRequests.edges;
		let cgcRequestDataObjects = _.map(raw, (item) => item.node);

		//TODO filter out rows where status is not active

		this.state.rows = [];
		for (let i = 0; i < cgcRequestDataObjects.length; i++) {

			let dataObject = cgcRequestDataObjects[i];
			let curRow = [];

			for (let key in dataObject){
				let curKey = dataObject[key];
				switch (key){

					case "dueDate":
						let newDate = curKey.slice(0, 10);
						curRow.push(<td>{newDate}</td>);
						break;
					case "cgc": case "user":
						if (curKey.edges.length > 0){
							curRow.push(<td>{curKey.edges[0].node.id}</td>);
							break;
						}
						curRow.push(<td>{}</td>);
						break;
					case "__typename":
						break;
					default:
						curRow.push(<td>{curKey}</td>)

				}
			}
			this.state.rows.push(<tr>{curRow}</tr>)
		}

		return (
			<div className="App">
				<div style={{width: "90%", margin: "0 auto"}}>
					<Table striped bordered condensed hover>
						<thead>
						<tr>
							<th>ID</th>
							<th>Status</th>
							<th>Assigned Experts</th>
							<th>Topic</th>
							<th>Subtopic</th>
							<th>Payment</th>
							<th>Clip ID</th>
							<th># Requested</th>
							<th>Due Date</th>
							<th>Submitted CGCs</th>

						</tr>
						</thead>
						<tbody>
							{this.state.rows}
						</tbody>
					</Table>
				</div>
			</div>
		);
	}
}

const CGCRequestQuery = gql`
  query CGCRequestQuery {
    viewer {
      allCgcRequests {
        edges {
          node {
            id
            status
            user {
              edges {
                node {
                  id
                  username
                }
              }
            }
            topic
            subtopic
            payment
            clipId
            numberRequested
            dueDate
            cgc {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }


`;

const CGCRequestPageWithData = graphql(CGCRequestQuery)(withRouter(CGCRequestPage));


export default CGCRequestPageWithData;
