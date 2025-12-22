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

export const GET_GENE_TABLE_BY_FILTERS = gql`
  query GetGeneBy($limit: Int, $page: Int, $advancedSearch: String) {
    getGeneBy(limit: $limit, page: $page, advancedSearch: $advancedSearch) {
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
          startPosition
          endPosition
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
          startPosition
          endPosition
          strand
          sequence
          length
          product {
            sequence
            length
            aminoacidSequence
          }
          utrs {
            startPosition
            endPosition
            sequence
            type
          }
          exons {
            startPosition
            endPosition
            sequence
            type
          }
          cds {
            startPosition
            endPosition
            sequence
            type
          }
        }
      }
    }
  }
`;
