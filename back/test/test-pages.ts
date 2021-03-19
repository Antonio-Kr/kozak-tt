import { expect } from 'chai';
import request from 'request';

it('Nikita', (done: any) => {
  const body = {
    login: 'fitipiti1',
    email: 'email1@email.com',
    password: '1233',
  };
  request.post(
    'http://localhost:3001/users/register',
    { body: JSON.stringify(body) },
    function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    }
  );
});
