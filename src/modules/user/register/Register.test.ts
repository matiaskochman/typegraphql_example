import { testConn } from "../../../test-utils/testConn";
import { Connection } from "typeorm";
import { gCall } from "../../../test-utils/gCall";

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
    const res = await gCall({
      source: registerMutation,
      variableValues: {
        data: {
          firstName: "testname",
          lastName: "testlastname",
          email: "testemail@email.com",
          password: "testpassword"
        }
      }
    })
    console.log(res);
  });
});

// describe("Register", () => {
//   it("create user", async () => {
//     console.log(
//       await gCall({
//         source: registerMutation,
//         variableValues: {
//           data: {
//             firstName: "bob",
//             lastName: "bob2",
//             email: "bob@bob.com",
//             password: "asdfasdf"
//           }
//         }
//       })
//     );
//   });
// });