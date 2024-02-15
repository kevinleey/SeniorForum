import request from 'request';

var options = { method: 'POST',
    url: 'https://dev-xva3bwyqfub0c5sf.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"lgnBDQjZtQIuhohqLKADl6LAII7ulxnc","client_secret":"xzhG3b2zEQ1qvClkVlm1TOkiSt_9i6WgCvBArqVIfvX77K04srmou_nT5lj_q5lg","audience":"https://localhost:3000","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
});