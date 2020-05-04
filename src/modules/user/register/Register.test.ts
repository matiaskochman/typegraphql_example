import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";
import faker from 'faker';
import { User } from "../../../entities/User";

let conn: Connection; 

beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.close();
});
jest.setTimeout(150000);


const registerMutation = `
mutation Register($data: RegisterInputType!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    name
  }
}
`;

describe('Register', () => {
  it('create user ', async () => {

    const user = {
      firstName: faker.name.firstName(10),
      lastName: faker.name.lastName(5),
      email: faker.internet.email(),
      password: faker.internet.password(7)

    }
    const res = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    })

    expect(res).toMatchObject(
      {
        data: {
          register: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        }
      }
    );

    const dbUser = await User.findOne({where: {email: user.email}});

    expect(dbUser).toBeDefined();
    expect(dbUser!.confirmed).toBeFalsy();
    expect(dbUser!.firstName).toBe(user.firstName);

  });
});

