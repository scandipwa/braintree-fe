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

/** @namespace BraintreeGraphql/Plugin/ConfigQuery/getStoreConfigFields */
const _getStoreConfigFields = (args, callback) => [
    ...callback(...args),
    'braintree_cc_vault'
];

export default {
    'Query/Config': {
        'member-function': {
            _getStoreConfigFields
        }
    }
};
