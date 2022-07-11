import { gql } from "@apollo/client";
import { apolloClient } from "apollo/client";
import { Hello } from "graphql/types";
import { NextPage } from "next";

export const getServerSideProps = async () => {
  const result = await apolloClient.query({
    query: gql`
      query SayHello {
        sayHello {
          message
        }
      }
    `,
  });
  return {
    props: { message: result.data.sayHello.message },
  };
};

const GraphQlPage: NextPage<Hello> = ({ message }) => {
  console.log("message", message);
  return <div>{message}</div>;
};

export default GraphQlPage;