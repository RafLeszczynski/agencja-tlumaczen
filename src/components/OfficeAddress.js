import React from 'react';
import Button from 'components/Button';

class OfficeAddress extends React.Component {
    render() {
        return (
            <div>
                <p class="open-hours">
                    <span class="hours">{this.props.address.hours}</span><br/>
                    <span class="days">{this.props.address.days}</span>
                </p>
                <p class="address">
                    <span class="street-address">{this.props.address.street}</span><br/>
                    <span class="postal-code">{this.props.address.postalCode}</span>
                    <span class="city">{this.props.address.city}</span><br/>
                    <span class="details">{this.props.address.details}</span>
                </p>
                <Button name={this.props.showLocation} />
            </div>
        );
    }
}

export default OfficeAddress;
