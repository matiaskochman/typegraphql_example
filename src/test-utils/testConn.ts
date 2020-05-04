
import { createConnection } from 'typeorm';

export const testConn = async (drop: boolean = false) => {

  const entitiesPath = [__dirname + "/../entities/*.*"];
  const conn =  await createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    database: "typegraphql_example_test",
    synchronize: drop, 
    dropSchema: drop,
    entities: entitiesPath

    // entities: [
    //   "../entities/*.*"
    // ]
  });
  return conn;
}
