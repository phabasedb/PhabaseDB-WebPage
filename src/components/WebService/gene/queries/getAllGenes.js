// standard

// third party
import { gql } from "@apollo/client";

// local

export const GET_GENE_ALL = gql`
  query GetAllGenes($limit: Int, $page: Int) {
    getAllGenes(limit: $limit, page: $page) {
      data {
        _id
        gene {
          accessionId
          name
        }
        chromosome {
          name
        }
        organism {
          _id
          name
        }
      }
      pagination {
        totalResults
        limit
        currentPage
        hasNextPage
      }
    }
  }
`;
