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

import { cloneElement } from 'react';

/** @namespace BraintreeGraphql/Plugin/CheckoutBilling/aroundRenderPayments */
export const renderPayments = (args, callback, instance) => {
    const {
        isSavePayment,
        onPaymentSavedInVaultChange
    } = instance.props;

    const originalElement = callback.apply(instance, args);
    const additionalProps = {
        isSavePayment,
        onPaymentSavedInVaultChange
    };

    return cloneElement(
        originalElement,
        additionalProps
    );
};

export default {
    'Component/CheckoutBilling/Component': {
        'member-function': {
            renderPayments
        }
    }
};
