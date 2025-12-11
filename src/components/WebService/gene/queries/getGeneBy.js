// standard

// third party
import { gql } from "@apollo/client";

// local

export const GET_GENE_BY_TERM = gql`
  query GetGeneBy(
    $limit: Int
    $page: Int
    $properties: [String]
    $search: String
    $fullMatchOnly: Boolean
  ) {
    getGeneBy(
      limit: $limit
      page: $page
      properties: $properties
      search: $search
      fullMatchOnly: $fullMatchOnly
    ) {
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

export const GET_GENE_BY_ID = gql`
  query GetGeneBy(
    $limit: Int
    $page: Int
    $properties: [String]
    $search: String
    $fullMatchOnly: Boolean
  ) {
    getGeneBy(
      limit: $limit
      page: $page
      properties: $properties
      search: $search
      fullMatchOnly: $fullMatchOnly
    ) {
      data {
        _id
        gene {
          accessionId
          name
          start
          end
          strand
          sequence
          length
          description
        }
        chromosome {
          _id
          name
          type
        }
        organism {
          _id
          name
        }
        transcripts {
          _id
          accessionId
          start
          end
          strand
          sequence
          length
          product {
            sequence
            length
            aminoacidSequence
            aminoacidLength
          }
          utrs {
            start
            end
            sequence
            type
          }
          exons {
            start
            end
            sequence
            type
          }
          cds {
            start
            end
            sequence
            type
          }
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
