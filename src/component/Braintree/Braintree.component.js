/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/braintree-graphql
 * @link https://github.com/scandipwa/braintree-graphql
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import Loader from 'Component/Loader';
import { isSignedIn } from 'Util/Auth';

import { BRAINTREE_CONTAINER_ID } from './Braintree.config';

import './Braintree.style';

/** @namespace BraintreeGraphQl/Component/Braintree/Component/Braintree */
export class Braintree extends PureComponent {
    static propTypes = {
        init: PropTypes.func.isRequired,
        onPaymentSavedInVaultChange: PropTypes.func.isRequired,
        isSavePayment: PropTypes.bool,
        isVaultActive: PropTypes.bool
    };

    state = {
        isLoading: true,
        isSavePayment: false,
        isVaultActive: false
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    componentDidMount() {
        const { init } = this.props;

        init().then(
            /** @namespace BraintreeGraphQl/Component/Braintree/Component/init/then */
            () => this.setState({ isLoading: false })
        );
    }

    renderSavePaymentCheckbox() {
        const {
            onPaymentSavedInVaultChange,
            isSavePayment,
            isVaultActive
        } = this.props;
        const { isLoading } = this.state;

        if (isLoading || !isSignedIn() || !isVaultActive) {
            return null;
        }

        return (
            <Field
              id="isSavePayment"
              name="isSavePayment"
              type="checkbox"
              label={ __('Save card for later?') }
              value="isSavePayment"
              mix={ { block: 'Braintree', elem: 'Checkbox' } }
              checked={ isSavePayment }
              onChange={ onPaymentSavedInVaultChange }
            />
        );
    }

    render() {
        const { isLoading } = this.state;

        return (
            <div block="Braintree">
                <Loader isLoading={ isLoading } />
                <div
                  block="Braintree"
                  elem="Form"
                  id={ BRAINTREE_CONTAINER_ID }
                />
                { this.renderSavePaymentCheckbox() }
            </div>
        );
    }
}

export default Braintree;
