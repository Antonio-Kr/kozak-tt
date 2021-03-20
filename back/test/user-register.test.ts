import { Done } from 'mocha';
import { expect } from 'chai';
import request, { Response, Test, SuperTest } from 'supertest';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import app from '../server';
import { deleteUserByEmail } from '../utils/testCaseHelper';

describe('Testing user registration', () => {
  const userData = {
    login: 'fitipiti',
    email: 'email@email.com',
    password: '123456789',
  };

  let agent: SuperTest<Test>;
  before(() => {
    agent = request(app);
  });

  afterEach(async () => {
    await deleteUserByEmail(userData.email);
  });

  it('Should register user', (done: Done) => {
    agent
      .post('/users/register')
      .send(userData)
      .expect((res: Response) => {
        const { status, body } = res;
        expect(status).eq(200);

        const { password: userPassword, ...restUserData } = userData;
        const { password: bodyPassword, _id, __v, ...restBodyData } = body;

        expect(bcrypt.compareSync(userPassword, bodyPassword)).eq(true);
        expect(restBodyData).deep.eq(restUserData);
      })
      .end(done);
  });

  it('Should fall with unique "login" error', (done: Done) => {
    agent
      .post('/users/register')
      .send(userData)
      .end(() => {
        agent
          .post('/users/register')
          .send(userData)
          .expect((res: Response) => {
            const { status, body } = res;
            expect(status).eq(400);
            expect(body.message).eq(
              `This login "${userData.login}" already taken`
            );
          })
          .end(done);
      });
  });

  it('Should fall with unique "email" error', (done: Done) => {
    agent
      .post('/users/register')
      .send(userData)
      .end(() => {
        const user = _.cloneDeep(userData);
        user.login = user.login + '1';
        agent
          .post('/users/register')
          .send(user)
          .expect((res: Response) => {
            const { status, body } = res;
            expect(status).eq(400);
            expect(body.message).eq(
              `This email "${userData.email}" already taken`
            );
          })
          .end(done);
      });
  });
});
