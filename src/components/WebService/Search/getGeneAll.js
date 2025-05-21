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
          startPosition
          endPosition
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
