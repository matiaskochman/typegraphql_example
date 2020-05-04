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


// const registerMutation = `
// mutation Register($data: RegisterInputType!) {
//   register(
//     data: $data
//   ) {
//     id
//     firstName
//     lastName
//     email
//     name
//   }
// }
// `;

const currentUserQuery = `
query CurrentUser{
  currentUser{
    id
    firstName
    lastName
    email
  }
}
`;

describe('Current User', () => {
  it('get user ', async () => {

    const user = await User.create({
      firstName: faker.name.firstName(10),
      lastName: faker.name.lastName(5),
      email: faker.internet.email(),
      password: faker.internet.password(7)
    }).save();


    const res = await gCall({
      source: currentUserQuery,
      userId: user.id
    });

    expect(res).toMatchObject({
      data: {
        currentUser: {
          id: `${user.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })
  });

  it('null user ', async () => {

    const res = await gCall({
      source: currentUserQuery,
    });

    expect(res).toMatchObject({
      data: {
        currentUser: null
      }
    })
  });

});

