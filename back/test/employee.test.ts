import { Done } from 'mocha';
import { expect } from 'chai';
import request, { Response, Test, SuperTest } from 'supertest';
import _, { eq } from 'lodash';

import app from '../server';
import {
  deleteEmployeeByName,
  deleteUserByEmail,
} from '../utils/testCaseHelper';
import { IEmployee } from '../interfaces/employee.interface';

export default () =>
  describe('Testing emplyee route', () => {
    const userData = {
      login: 'fitipiti',
      email: 'email@email.com',
      password: '123456789',
    };

    const employeeData: IEmployee = {
      name: 'test empoyee',
      sex: 'male',
      contactInfo: 'telega: @antonio_kr',
      salary: 100,
      position: 'Developer',
      birthday: new Date(1996, 7, 15),
    };

    let agent: SuperTest<Test>;
    let token: string;
    before((done: Done) => {
      agent = request(app);
      agent
        .post('/users/register')
        .send(userData)
        .end(() => {
          agent
            .post('/users/login')
            .send(userData)
            .expect((res: Response) => {
              token = 'Bearer ' + res.body.token;
            })
            .end(done);
        });
    });

    after(async () => {
      await deleteUserByEmail(userData.email);
      await deleteEmployeeByName(employeeData.name);
    });

    it('Should fall with unauthoized error', (done: Done) => {
      agent
        .get('/employees')
        .expect((res: Response) => {
          expect(res.body.msg).eq('Unauthorized');
        })
        .end(done);
    });

    it('Should get list of employees', (done: Done) => {
      agent
        .get('/employees')
        .set('Authorization', token)
        .expect((res: Response) => {
          expect(res.body).to.be.instanceOf(Array);
        })
        .end(done);
    });

    it('Should insert one employee', (done: Done) => {
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employeeData)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(200);

          const { _id, __v, createdAt, updatedAt, ...employee } = body;
          employee.birthday = new Date(employee.birthday);
          expect(employee).deep.eq(employeeData);
        })
        .end(done);
    });

    it('Should get one employee', (done: Done) => {
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employeeData)
        .end((error, res: Response) => {
          const insertedUser = res.body;
          agent
            .get(`/employees/${res.body._id}`)
            .set('Authorization', token)
            .expect((res: Response) => {
              const { status, body } = res;
              expect(status).eq(200);
              expect(body).deep.eq(insertedUser);
            })
            .end(done);
        });
    });

    it('Should fall with required name error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.name = '';
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'name',
            msg: 'Name is required field',
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with required sex error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.sex = '';
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'sex',
            msg: 'Sex is required field',
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with wrong sex error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.sex = employee.sex + '1';
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'sex',
            msg: `\`${employee.sex}\` is not a valid enum value for path \`sex\`.`,
            type: 'enum',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with required contactInfo error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.contactInfo = '';
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'contactInfo',
            msg: `Contact info is required field`,
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with required salary error', (done: Done) => {
      const employee: any = _.cloneDeep(employeeData);
      delete employee.salary;
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'salary',
            msg: `Salary is required field`,
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with min value salary error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.salary = 99;
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'salary',
            msg: `Salary should be at least 100 points`,
            type: 'min',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with required position error', (done: Done) => {
      const employee = _.cloneDeep(employeeData);
      employee.position = '';
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'position',
            msg: `Job position is required field`,
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should fall with required birthday error', (done: Done) => {
      const employee: any = _.cloneDeep(employeeData);
      delete employee.birthday;
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employee)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(400);

          const errorTemplate = {
            field: 'birthday',
            msg: `Birthday is required field`,
            type: 'required',
          };
          const [error] = body;
          expect(error).deep.eq(errorTemplate);
        })
        .end(done);
    });

    it('Should update one employee', (done: Done) => {
      agent
        .post('/employees')
        .set('Authorization', token)
        .send(employeeData)
        .expect((res: Response) => {
          const { status, body } = res;
          expect(status).eq(200);

          const { _id, __v, createdAt, updatedAt, ...employee } = body;
          expect(employee).deep.eq(employeeData);
        })
        .end(() => {
          const employee = _.cloneDeep(employeeData);
          employee.salary = 101;
          agent
            .put('/employees')
            .set('Authorization', token)
            .send(employee)
            .expect((res: Response) => {
              res.body.birthday = new Date(res.body.birthday);
              expect(employee).deep.eq(res.body);
            })
            .end(done);
        });
    });
  });
