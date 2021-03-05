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

import Braintree from '../component/Braintree';
import { BRAINTREE } from '../component/Braintree/Braintree.config';

/** @namespace BraintreeGraphql/Plugin/CheckoutPayments/renderBraintreePayment */
export function renderBraintreePayment() {
    const {
        initBraintree,
        onPaymentSavedInVaultChange,
        isSavePayment,
        braintreeVaultActive
    } = this.props;

    return (
        <Braintree
          init={ initBraintree }
          onPaymentSavedInVaultChange={ onPaymentSavedInVaultChange }
          isSavePayment={ isSavePayment }
          isVaultActive={ braintreeVaultActive }
        />
    );
}

/** @namespace BraintreeGraphql/Plugin/CheckoutPayments/propTypes */
export const propTypes = (originalMember) => ({
    ...originalMember,
    braintreeVaultActive: PropTypes.bool.isRequired,
    onPaymentSavedInVaultChange: PropTypes.func.isRequired
});

/** @namespace BraintreeGraphql/Plugin/CheckoutPayments/paymentRenderMap */
export const paymentRenderMap = (originalMember, instance) => ({
    ...originalMember,
    [BRAINTREE]: renderBraintreePayment.bind(instance)
});

export default {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap
        },
        'static-member': {
            propTypes
        }
    }
};
