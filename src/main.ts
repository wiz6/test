import * as cors from 'cors';
import * as express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import routes from './routes';
import {RouteMethods} from './types';
import {PORT} from './utils/config';

import axios from 'axios';

const app = express();

app.use(cors());

routes.forEach((route) => {
  if (route.method === RouteMethods.GET) {
    app.get(route.name, route.middlewares);
  }
});

app.use(errorMiddleware);

const Mailchimp = require('mailchimp-api-v3')

app.listen(PORT, async () => {

  axios.get('https://topcodeoue-99a234.pipedrive.com/api/v1/persons?api_token=1a252584e620269541499d58cef11ffd84f55e06').then(data => {
    console.log('data: ', data.data.data)
  })

  const mailchimp = new Mailchimp('148e697d756ec8edc94b919063cc5e7d-us20');


  mailchimp.get({
    path : '/lists/79b4d6f5c5/members'
  })
    .then(function (result) {

    //console.log((result))
    })
    .catch(function (err) {
    console.log(err)
    })
});
