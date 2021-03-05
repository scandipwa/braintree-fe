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

import { BRAINTREE, BRAINTREE_CONTAINER_ID } from '../component/Braintree/Braintree.config';
import BraintreeDropIn from '../util/Braintree';

export const braintree = new BraintreeDropIn(BRAINTREE_CONTAINER_ID);

/** @namespace BraintreeGraphql/Plugin/CheckoutPaymentsContainer/mapStateToProps */
export const mapStateToProps = (args, callback) => {
    const [
        {
            ConfigReducer: {
                braintree_cc_vault: braintreeVaultActive
            }
        }
    ] = args;

    return {
        ...callback(...args),
        braintreeVaultActive
    };
};

/** @namespace BraintreeGraphql/Plugin/CheckoutPaymentsContainer/initBraintree */
export function initBraintree() {
    return braintree.create();
}

/** @namespace BraintreeGraphql/Plugin/CheckoutPaymentsContainer/getBraintreeData */
export function getBraintreeData() {
    const {
        totals: {
            grand_total = 0
        },
        email,
        address
    } = this.props;

    return {
        asyncData: braintree.requestPaymentNonce(grand_total, email, address)
    };
}

/** @namespace BraintreeGraphql/Plugin/CheckoutPaymentsContainer/containerFunctions */
export const containerFunctions = (originalMember) => ({
    ...originalMember,
    initBraintree
});

/** @namespace BraintreeGraphql/Plugin/CheckoutPaymentsContainer/dataMap */
export const dataMap = (originalMember, instance) => ({
    ...originalMember,
    [BRAINTREE]: getBraintreeData.bind(instance)
});

export default {
    'Component/CheckoutPayments/Container': {
        'member-property': {
            containerFunctions,
            dataMap
        }
    },
    'Component/CheckoutPayments/Container/mapStateToProps': {
        function: mapStateToProps
    }
};
