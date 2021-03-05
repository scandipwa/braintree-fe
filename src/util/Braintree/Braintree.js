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

import { Field } from 'Util/Query';
import { fetchMutation, fetchQuery } from 'Util/Request';

/** @namespace BraintreeGraphql/Util/Braintree */
export class Braintree {
    isLoading = false;

    isThreeDSecure = false;

    __construct(containerId) {
        super.__construct();
        this.containerId = containerId;
    }

    async create() {
        const { default: dropIn } = await import('braintree-web-drop-in');
        const authorization = await this.requestBraintreeClientToken();
        const configuration = await this.requestBraintreeConfig();
        this.isThreeDSecure = configuration.is_three_d_secure;
        this.braintreeDropIn = await dropIn.create({
            authorization,
            container: `#${ this.containerId }`,
            threeDSecure: this.isThreeDSecure
        });

        return true;
    }

    requestBraintreeConfig() {
        const query = new Field('getBraintreeConfig').addFieldList(['is_three_d_secure']);
        return fetchQuery(query).then(
            /** @namespace Braintree/Util/Braintree/fetchQuery/then */
            ({ getBraintreeConfig }) => getBraintreeConfig
        );
    }

    requestBraintreeClientToken() {
        const mutation = (new Field('createBraintreeClientToken')).setAlias('token');
        return fetchMutation(mutation).then(
            /** @namespace Braintree/Util/Braintree/fetchMutation/then */
            ({ token }) => token
        );
    }

    convertAddressToBillingAddress(address) {
        const {
            firstname = '',
            lastname = '',
            telephone = '',
            street0 = '',
            street1 = '',
            city = '',
            postcode = '',
            country_id = '',
            region_code = ''
        } = address || {};

        return {
            givenName: firstname,
            surname: lastname,
            phoneNumber: telephone,
            streetAddress: street0,
            extendedAddress: street1,
            locality: city,
            region: region_code,
            postalCode: postcode,
            countryCodeAlpha2: country_id
        };
    }

    requestPaymentNonce(amount, email, address) {
        const requestData = this.isThreeDSecure ? {
            threeDSecure: {
                amount,
                email,
                billingAddress: this.convertAddressToBillingAddress(address)
            }
        } : {};

        return this.braintreeDropIn.requestPaymentMethod(requestData);
    }
}

export default Braintree;
