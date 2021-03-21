import { Done } from 'mocha';
import { expect } from 'chai';
import request, { Response, Test, SuperTest } from 'supertest';
import _ from 'lodash';

import app from '../server';
import { deleteUserByEmail } from '../utils/testCaseHelper';

export default () =>
  describe('Testing user login', () => {
    const userData = {
      login: 'fitipiti',
      email: 'email@email.com',
      password: '123456789',
    };

    let agent: SuperTest<Test>;
    before((done: Done) => {
      agent = request(app);
      agent.post('/users/register').send(userData).end(done);
    });

    after(async () => {
      await deleteUserByEmail(userData.email);
    });

    it('Should login user', (done: Done) => {
      agent
        .post('/users/login')
        .send(userData)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(200);
          expect(body).to.have.key('token');
        })
        .end(done);
    });

    it('Should fall with wrong email', (done: Done) => {
      const user = _.cloneDeep(userData);
      user.email = user.email + '1';
      agent
        .post('/users/login')
        .send(user)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(500); // todo: поменять код ошибки
          expect(body.msg).eq("This email doesn't exist"); // todo: поменять ключ: message => msg
        })
        .end(done);
    });

    it('Should fall with wrong password', (done: Done) => {
      const user = _.cloneDeep(userData);
      user.password = user.password + '1';
      agent
        .post('/users/login')
        .send(user)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(500);
          expect(body.msg).eq('Wrong password');
        })
        .end(done);
    });
  });
