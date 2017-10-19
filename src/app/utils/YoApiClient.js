import { fromJS, Map } from 'immutable';
import types, { settingsInitFalse } from 'app/components/elements/notification/type';

const YO = '/yo';
//const YO = 'https://yo.steemitdev.com';
//const YO = 'https://api.steemitdev.com';

/**
 * Re-formats API notifications response a little bit.
 *
 * @param {Array} res
 *
 * @return {Array}
 */
function normalize(res) {
    return res.map(n => ({
        ...n,
        id: n.notify_id.toString(),
        shown: n.seen,
        notificationType: n.notify_type,
        item: n.data.item,
    }));
}

/**
 * Cleans up settings from Yo.
 *
 * If notification_types is null, assume we need to set defaults.
 *
 * @param {Object} transportsFromApi transports part of the payload from api
 * @param {Array} types all the notif types
 * @param {Array} settingsInitFalse settings to initialize as false by default
 * @return {Object}
 */
export function normalizeSettingsFromApi(transportsFromApi, types, settingsInitFalse) {
    // For each of the transports coming through from the API,
    // If the API's notification_types is truthy,
    // Transform array of enabled types to Map
    // And assign it to our output Map
    const defaultTypes = types.reduce((acc, t) => ({
        ...acc,
        [t]: settingsInitFalse.indexOf(t) < 0,
    }), {});

    return Object.keys(transportsFromApi).reduce((acc, transport) => {
        if (transportsFromApi[transport].notification_types !== null) { // TODO: work with Gareth to make sure api supplies null if nothing has been saved yet
            const transportTypes = transportsFromApi[transport].notification_types;
            return acc.setIn([transport, 'notification_types'], types.reduce((acc, type) => {
                return acc.set(type, !transportTypes.indexOf(type));
            }, Map()));
        } else {
            return acc.setIn([transport, 'notification_types'], Map(defaultTypes));
        }
    }, Map());
}

export function fetchAllNotifications(username) {
    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.get_notifications',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                notify_type: 'vote', // Todo: for dev only! Do not merge if present!
                //username, // Todo: for dev only! Do not merge if present!
                username: 'test_user', // Todo: for dev only! Do not merge if present!
            },
        }),
    })
    .then(r => r.json()).then(res => {
        if (res.result && res.result.length > 0) {
            return normalize(res.result);
        }
        return []; // empty...?
    })
    .catch(error => {
        return { error };
    });
}

/**
 *
 * @param {String} username
 * @param {String} [before] created prior to timestamp, formatted like 2017-10-12T21:25:06.964364
 * @param {String} [after] modified after timestamp, formatted like 2017-10-12T21:25:06.964364
 * @param {String[]} types only these notification types
 *
 */
export function fetchSomeNotifications({username, before, after, types }) { // Todo: filter by types once api allows for it
    const beforeOrAfterParams = {};
    if (after) beforeOrAfterParams.modified_after = after;
    if (before) beforeOrAfterParams.created_before = before;

    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.get_notifications',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                notify_type: 'vote', // Todo: for dev only! Do not merge if present!
                //username, // Todo: for dev only! Do not merge if present!
                username: 'test_user', // Todo: for dev only! Do not merge if present!
                ...beforeOrAfterParams,
            },
        }),
    }).then(r => r.json()).then(res => {
        if (res.result && res.result.length > 0) {
            return normalize(res.result);
        }
        return [];
    })
    .catch(error => {
        return { error };
    });
}

export function markAsRead(ids) {
    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.mark_read',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                ids: ids.map(id => parseInt(id, 10)),
            },
        }),
    }).then(r => r.json()).then(res => {
        if (res.result && res.result.length > 0) {
            return normalize(res.result);
        }
        return [];
    })
    .catch(error => {
        return { error };
    });
}

export function markAsShown(ids) {
    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.mark_seen',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                ids,
            },
        }),
    }).then(r => r.json()).then(res => {
        if (res.result && res.result.length > 0) {
            return normalize(res.result);
        }
        return [];
    })
    .catch(error => {
        return { error };
    });
}

/**
 *
 * @param {String} username
 * @return {Map|Object} if error, object w/ error prop
 */
export function getNotificationSettings(username) {
//    return Promise.resolve(normalizeSettings({
//        foo: 'bar',
//    }));
    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.get_transports',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                username,
            },
        }),
    }).then(r => r.json()).then(res => {
        return normalizeSettingsFromApi(res.result, types, settingsInitFalse);
    })
    .catch(error => {
        return { error };
    });
}

/**
 *
 * @param {String} username
 * @param {Object} settings
 * @return {Map|Object} if error, object w/ error prop
 */
export function saveNotificationSettings(username, settings) {
//    return Promise.resolve(normalizeSettings({
//        foo: 'bar',
//    }));
    return fetch(YO, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'yo.set_transports',
            params: {
                test: true, // Todo: for dev only! Do not merge if present!
                username,
                transports: settings,
            },
        }),
    }).then(r => r.json()).then(res => {
        return normalizeSettingsFromApi(res.result, types, settingsInitFalse);
    })
    .catch(error => {
        return { error };
    });
}