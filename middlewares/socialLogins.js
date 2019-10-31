import Axios from 'axios'
import Request from 'request'
import OAuth from 'oauth'
import timestamp from 'unix-timestamp'
import oauthSignature from 'oauth-signature'

import socialConfig from '../config/socialAuth';

exports.tokeExchangeMiddleware =  async (req, res, next) => {
    switch (req.params.provider) {
        case 'github':
            githubAuth(req, res, next)
            break
        case 'facebook':
            facebookAuth(req, res, next)
            break
        case 'google':
            googleAuth(req, res, next)
            break
        case 'twitter':
            twitterAuth(req, res, next)
            break
        case 'instagram':
            instagramAuth(req, res, next)
            break
        case 'bitbucket':
            bitbucketAuth(req, res, next)
            break
        case 'linkedin':
            linkedinAuth(req, res, next)
            break
        case 'live':
            liveAuth(req, res, next)
            break
        case 'login':
            loginAuth(req, res, next)
            break
        case 'register':
            registerAuth(req, res, next)
            break
        case 'logout':
            logoutAuth(req, res, next)
            break
    }
};



function githubAuth(req, res, next) {
    Axios.post('https://github.com/login/oauth/access_token', {
        client_id: socialConfig.github.clientId,
        client_secret: socialConfig.github.clientSecret,
        code: req.body.code,
        redirect_uri: req.body.redirectUri,
        state: req.body.state,
        grant_type: 'authorization_code'
    }, { 'Content-Type': 'application/json' }).then(function (response) {
        var responseJson = parseQueryString(response.data)
        if (responseJson.error) {
            res.status(500).json({ error: responseJson.error })
        } else {
            res.json(responseJson)
        }
    }).catch(function (err) {
        res.status(500).json(err)
    })
}

function facebookAuth(req, res, next) {
    Axios.post('https://graph.facebook.com/v2.4/oauth/access_token', {
        client_id: socialConfig.facebook.clientId,
        client_secret: socialConfig.facebook.clientSecret,
        code: req.body.code,
        redirect_uri: req.body.redirectUri
    }, { 'Content-Type': 'application/json' }).then(function (response) {
        var responseJson = response.data
        res.json(responseJson)
    }).catch(function (err) {
        res.status(500).json(err)
    })
}

function googleAuth(req, res, next) {
    Request({
        method: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        form: {
            code: req.body.code,
            client_id: socialConfig.google.clientId,
            client_secret: socialConfig.google.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function instagramAuth(req, res, next) {
    Request({
        method: 'post',
        url: 'https://api.instagram.com/oauth/access_token',
        form: {
            code: req.body.code,
            client_id: socialConfig.instagram.clientId,
            client_secret: socialConfig.instagram.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function bitbucketAuth(req, res, next) {
    Request({
        method: 'post',
        url: 'https://bitbucket.org/site/oauth2/access_token',
        form: {
            code: req.body.code,
            client_id: socialConfig.bitbucket.clientId,
            client_secret: socialConfig.bitbucket.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function linkedinAuth(req, res, next) {
    Request({
        method: 'post',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        form: {
            code: req.body.code,
            client_id: socialConfig.linkedin.clientId,
            client_secret: socialConfig.linkedin.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function liveAuth(req, res, next) {
    Request({
        method: 'post',
        url: 'https://login.live.com/oauth20_token.srf',
        form: {
            code: req.body.code,
            client_id: socialConfig.live.clientId,
            client_secret: socialConfig.live.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/json'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}



function twitterAuth(req, res, next) {
    const oauthService = new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        socialConfig.twitter.clientId,
        socialConfig.twitter.clientSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    )
    if (!req.body.oauth_token) {
        oauthService.getOAuthRequestToken({ oauth_callback: req.body.redirectUri }, function (error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                res.status(500).json(error)
            } else {
                res.json({
                    oauth_token: oauthToken,
                    oauth_token_secret: oauthTokenSecret
                })
            }
        })
    } else {
        oauthService.getOAuthAccessToken(req.body.oauth_token, null, req.body.oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {

            if (error) {
                res.status(500).json(error)
            } else {
                var verifyCredentialsUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json'
                var parameters = {
                    oauth_consumer_key: socialConfig.twitter.clientId,
                    oauth_token: oauthAccessToken,
                    oauth_nonce: ('vueauth-' + new Date().getTime()),
                    oauth_timestamp: timestamp.now(),
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_version: '1.0'
                }

                var signature = oauthSignature.generate('GET', verifyCredentialsUrl, parameters, socialConfig.twitter.clientSecret, oauthAccessTokenSecret)

                Axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', {
                    headers: {
                        Authorization: 'OAuth ' +
                            'oauth_consumer_key="' + socialConfig.twitter.clientId + '",' +
                            'oauth_token="' + oauthAccessToken + '",' +
                            'oauth_nonce="' + parameters.oauth_nonce + '",' +
                            'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
                            'oauth_signature_method="HMAC-SHA1",' +
                            'oauth_version="1.0",' +
                            'oauth_signature="' + signature + '"'
                    }
                }).then(function (response) {
                    res.json({
                        access_token: oauthAccessToken,
                        access_token_secret: oauthAccessTokenSecret,

                        profile: response.data
                    })
                }).catch(function (err) {
                    console.log(err.response.data.errors)
                    res.status(500).json(err.response.data.errors)
                })
            }
        })
    }
}

function parseQueryString(str) {
    let obj = {};
    let key;
    let value;
    (str || '').split('&').forEach((keyValue) => {
        if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
        }
    });
    return obj;
}
