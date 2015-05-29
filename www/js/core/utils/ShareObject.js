/**
 * Helper to easily share any object on Social Networks with the OS built in function
 *
 * parameters : sujet (string), message (string), url (string), imageUrl (string)
 * the subject message is needed, others are optionals
 */
define([
    'underscore',
], function (_) {
    'use strict';

    var ShareObject = function () {
    };

    _.extend(ShareObject.prototype, {

        send: function(subject, message, url, imageUrl) {
            message = message || null;
            url = url || null;
            imageUrl =imageUrl || null;

            if (subject) {
                window.plugins.socialsharing.share(message, subject, imageUrl, url);
            }

        },
    });

    return ShareObject;
});
