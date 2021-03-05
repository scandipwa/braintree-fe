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

import { BRAINTREE } from '../component/Braintree/Braintree.config';

/** @namespace BraintreeGraphql/Plugin/CheckoutBillingContainer/onPaymentSavedInVaultChange */
export function onPaymentSavedInVaultChange() {
    this.setState(({ isSavePayment }) => ({ isSavePayment: !isSavePayment }));
}

/** @namespace BraintreeGraphql/Plugin/CheckoutBillingContainer/containerFunctions */
export const containerFunctions = (originalMember, instance) => ({
    ...originalMember,
    onPaymentSavedInVaultChange: onPaymentSavedInVaultChange.bind(instance)
});

/** @namespace BraintreeGraphql/Plugin/CheckoutBillingContainer/getPaymentData */
export const _getPaymentData = (args, callback, instance) => {
    const { paymentMethod: code, isSavePayment } = instance.state;

    if (code === BRAINTREE) {
        const [[{ nonce }]] = args;

        return {
            code,
            additional_data: {
                payment_method_nonce: nonce,
                is_active_payment_token_enabler: isSavePayment
            }
        };
    }

    return callback(...args);
};

/** @namespace BraintreeGraphql/Plugin/CheckoutBillingContainer/componentDidMount */
export const componentDidMount = (args, callback, instance) => {
    callback.apply(instance, args);

    // Init state
    instance.setState({ isSavePayment: false });
};

export default {
    'Component/CheckoutBilling/Container': {
        'member-property': {
            containerFunctions
        },
        'member-function': {
            _getPaymentData,
            componentDidMount
        }
    }
};
