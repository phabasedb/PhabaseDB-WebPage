// standard

// third party
import { gql } from "@apollo/client";

// local

export const GET_GENE_ALL_DATATABLE = gql`
  query GetAllGenes {
    getAllGenes {
      data {
        _id
        gene {
          accessionId
          name
          start
          end
        }
        chromosome {
          name
        }
        organism {
          _id
          name
        }
      }
    }
  }
`;
