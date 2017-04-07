import React, { Component } from 'react';
import { Panel } from 'react-bootstrap'

class CGCCard extends Component {

  constructor(){
    super();
    this.state = {
      open: false,
    }
  }

  render() {

    let data = this.props.data;

    console.log(data);
    return (
      <div style={{margin: "12px"}}>
        <Panel collapsible expanded={this.state.open} header={data.id} onClick={()=>this.setState({open: !this.state.open})}>
          <div style={{width: "50%", float:"left"}}>
            <div>
				{data.user.username}
            </div>
            <div>
				{data.id}
            </div>
          </div>
          <div style={{float: "right", display:"inline-block", width:"50%", textAlign:"right"}}>
            <div>
                {data.status}
            </div>
            <div>
                {data.paymentStatus} {data.payment}
            </div>

          </div>

        </Panel>
      </div>
    );
  }
}

export default CGCCard;
